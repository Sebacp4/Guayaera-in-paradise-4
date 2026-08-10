import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  {
    auth: { persistSession: false, autoRefreshToken: false },
  }
);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        valid: false,
        error: 'Missing validation code',
      });
    }

    const { data, error } = await supabase
      .from('raffle_entries')
      .select('reservation_number, validation_code, status, created_at')
      .eq('validation_code', code)
      .single();

    if (error || !data) {
      return res.status(404).json({
        valid: false,
        error: 'Entry not found',
      });
    }

    return res.status(200).json({
      valid: true,
      reservation_number: data.reservation_number,
      validation_code: data.validation_code,
      status: data.status,
      created_at: data.created_at,
    });
  } catch (error) {
    console.error('Error validating raffle entry:', error);
    return res.status(500).json({
      valid: false,
      error: 'Internal Server Error',
    });
  }
}
