import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { randomBytes } from 'crypto';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  }
);

const resend = new Resend(process.env.RESEND_API_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

function escapeHtml(value = '') {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

async function generateReservationNumber() {
  const { data, error } = await supabase
    .from('raffle_entries')
    .select('reservation_number')
    .order('reservation_number', { ascending: false })
    .limit(1);

  let nextNumber = 1;

  if (!error && data && data.length > 0 && data[0].reservation_number) {
    const match = String(data[0].reservation_number).match(/(\d+)$/);
    if (match) {
      nextNumber = parseInt(match[1], 10) + 1;
    }
  }

  return `GP-${String(nextNumber).padStart(4, '0')}`;
}

function generateValidationCode() {
  return `rf_${randomBytes(24).toString('hex')}`;
}

function buildEmailHtml({ customerName, reservationNumber, validationUrl, qrImageUrl }) {
  const safeName = escapeHtml(customerName || 'there');
  const safeReservationNumber = escapeHtml(reservationNumber);
  const safeValidationUrl = escapeHtml(validationUrl);
  const safeQrImageUrl = escapeHtml(qrImageUrl);

  return `
  <div style="font-family: Arial, Helvetica, sans-serif; background:#000000; padding:32px; color:#FDFAF5;">
    <div style="max-width:560px; margin:0 auto; background:#FDFAF5; border-radius:24px; overflow:hidden; color:#000000;">
      <div style="background:#01C9CF; padding:28px 32px;">
        <h1 style="margin:0; font-size:24px; letter-spacing:-0.5px; color:#000000;">Guayaera Raffle Entry Confirmation</h1>
      </div>

      <div style="padding:32px;">
        <p style="font-size:16px; margin:0 0 16px;">Hi ${safeName},</p>

        <p style="font-size:16px; line-height:1.6; margin:0 0 24px;">
          Thank you for your purchase! Your raffle entry has been confirmed and is now a valid entry in the Guayaera in Paradise raffle system.
        </p>

        <div style="border:1px solid rgba(0,0,0,0.1); border-radius:16px; padding:24px; margin-bottom:24px;">
          <div style="font-size:12px; letter-spacing:2px; text-transform:uppercase; color:rgba(0,0,0,0.5); margin-bottom:4px;">Reservation Number</div>
          <div style="font-size:36px; font-weight:bold; letter-spacing:-1px; color:#000000;">${safeReservationNumber}</div>

          <div style="margin-top:20px; font-size:12px; letter-spacing:2px; text-transform:uppercase; color:rgba(0,0,0,0.5);">Status</div>
          <div style="font-size:20px; font-weight:bold; color:#01C9CF;">Valid Entry</div>
        </div>

        <div style="text-align:center; margin-bottom:24px;">
          <img src="${safeQrImageUrl}" alt="Raffle validation QR code" width="200" height="200" style="border-radius:12px; border:1px solid rgba(0,0,0,0.1);" />
        </div>

        <div style="text-align:center; margin-bottom:24px;">
          <a href="${safeValidationUrl}" style="display:inline-block; background:#EB459A; color:#FDFAF5; text-decoration:none; font-size:18px; font-weight:bold; padding:14px 32px; border-radius:12px;">
            View Your Validation
          </a>
        </div>

        <p style="font-size:14px; line-height:1.6; color:rgba(0,0,0,0.6); margin:0 0 8px;">
          Validation link:<br />
          <a href="${safeValidationUrl}" style="color:#01C9CF; word-break:break-all;">${safeValidationUrl}</a>
        </p>

        <p style="font-size:14px; line-height:1.6; color:rgba(0,0,0,0.6); margin:24px 0 0;">
          Please keep this email for your records. This confirmation verifies your official raffle entry.
        </p>
      </div>

      <div style="background:#000000; padding:20px 32px; color:rgba(253,250,245,0.6); font-size:12px;">
        Guayaera in Paradise — Raffle Confirmation
      </div>
    </div>
  </div>`;
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  let event;

  try {
    const rawBody = await getRawBody(req);
    const signature = req.headers['stripe-signature'];

    event = stripe.webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (error) {
    console.error('Webhook signature verification failed:', error.message);
    return res.status(400).json({ error: `Webhook Error: ${error.message}` });
  }

  if (event.type !== 'checkout.session.completed') {
    return res.status(200).json({ received: true });
  }

  try {
    const session = event.data.object;
    
    const isRaffleCheckout =
      session.metadata?.product_type === 'guayaera_raffle' ||
      session.metadata?.raffle === 'true';

    if (!isRaffleCheckout) {
      console.log('Ignoring non-raffle checkout session:', session.id);
      return res.status(200).json({
        received: true,
        ignored: true,
        reason: 'Not a Guayaera raffle checkout session',
      });
    }
    const { data: existing } = await supabase
      .from('raffle_entries')
      .select('id')
      .eq('stripe_session_id', session.id)
      .limit(1);

    if (existing && existing.length > 0) {
      return res.status(200).json({ received: true, duplicate: true });
    }

    const customerEmail = session.customer_details?.email || null;

    const customNameField = (session.custom_fields || []).find(
      (field) => field.key === 'customer_name'
    );

    const customerName = customNameField?.text?.value || session.customer_details?.name || '';

    const reservationNumber = await generateReservationNumber();
    const validationCode = generateValidationCode();

    const encodedValidationCode = encodeURIComponent(validationCode);
    const validationUrl = `${process.env.SITE_URL}/raffle/validate/${encodedValidationCode}`;
    const qrImageUrl = `${process.env.SITE_URL}/api/raffle-qr?code=${encodedValidationCode}`;

    const entryPayload = {
      reservation_number: reservationNumber,
      validation_code: validationCode,
      customer_name: customerName,
      customer_email: customerEmail,
      stripe_session_id: session.id,
      stripe_payment_intent: session.payment_intent || null,
      amount_paid: session.amount_total != null ? session.amount_total / 100 : null,
      currency: session.currency || null,
      status: 'valid',
      email_sent: false,
    };

    const { error: insertError } = await supabase
      .from('raffle_entries')
      .insert(entryPayload);

    if (insertError) {
      console.error('Failed to save raffle entry to Supabase:', insertError.message);
      return res.status(500).json({ error: 'Failed to persist raffle entry' });
    }

    let emailSent = false;

    if (customerEmail) {
      try {
        await resend.emails.send({
          from: process.env.EMAIL_FROM,
          to: customerEmail,
          replyTo: process.env.EMAIL_REPLY_TO,
          subject: 'Guayaera Raffle Entry Confirmation',
          html: buildEmailHtml({
            customerName,
            reservationNumber,
            validationUrl,
            qrImageUrl,
          }),
        });

        emailSent = true;
      } catch (emailError) {
        console.error('Failed to send confirmation email:', emailError.message);
      }

      if (emailSent) {
        await supabase
          .from('raffle_entries')
          .update({ email_sent: true })
          .eq('stripe_session_id', session.id);
      }
    }

    return res.status(200).json({
      received: true,
      reservationNumber,
    });
  } catch (error) {
    console.error('Error processing webhook:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
