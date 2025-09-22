// Vercel / Next.js serverless uyumlu basit DEMO handler.
// Gerçek veri kaydı veya üçüncü tarafa gönderim YAPMAZ.

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ ok: false, error: 'Method Not Allowed' });
  }

  const { email, password } = req.body || {};
  if (!email || !password) {
    return res.status(400).json({ ok: false, message: 'Eksik alan' });
  }

  // Sadece format kontrolü: demo amaçlı "başarılı"
  return res.status(200).json({ ok: true });
}
