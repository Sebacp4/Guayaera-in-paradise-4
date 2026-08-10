import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      customer_creation: 'always',
      line_items: [
        {
          price: process.env.STRIPE_RAFFLE_PRICE_ID,
          quantity: 1,
        },
      ],
      custom_fields: [
        {
          key: 'customer_name',
          label: {
            type: 'custom',
            custom: 'Full Name',
          },
          type: 'text',
          optional: false,
        },
      ],
            metadata: {
        product_type: 'guayaera_raffle',
        raffle: 'true',
      },
      success_url: `${process.env.SITE_URL}/raffle?success=true&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL}/raffle?canceled=true`,
    });

    return res.status(200).json({ url: session.url });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
}
