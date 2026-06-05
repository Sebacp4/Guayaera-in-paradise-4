import QRCode from 'qrcode';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).send('Method Not Allowed');
  }

  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).send('Missing validation code');
    }

    const encodedCode = encodeURIComponent(code);
    const validationUrl = `${process.env.SITE_URL}/raffle/validate/${encodedCode}`;

    const qrBuffer = await QRCode.toBuffer(validationUrl, {
      type: 'png',
      width: 400,
      margin: 1,
      color: {
        dark: '#000000',
        light: '#FFFFFF',
      },
    });

    res.setHeader('Content-Type', 'image/png');
    res.setHeader('Cache-Control', 'public, max-age=31536000, immutable');

    return res.status(200).send(qrBuffer);
  } catch (error) {
    console.error('Error generating QR image:', error);
    return res.status(500).send('Internal Server Error');
  }
}
