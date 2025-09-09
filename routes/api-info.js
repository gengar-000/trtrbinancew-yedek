const express = require("express");
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

router.get('/api-info', (req, res) => {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const query = 'SELECT * FROM info';
  
    connection.query(query, (error, results) => {
      connection.end();
  
      if (error) {
        console.error('Veritabanı hatası:', error);
        return res.status(500).json({ error: 'Veritabanı hatası' });
      }
  
      console.log('Veriler başarıyla alındı.');
      res.json(results);
    });
  });

  module.exports = router;