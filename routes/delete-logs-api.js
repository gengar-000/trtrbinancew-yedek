const express = require("express");
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

router.post('/delete-logs-api', (req, res) => {
    const connection = mysql.createConnection(process.env.DATABASE_URL);
    const deleteQuery = 'DELETE FROM info';
    
    connection.query(deleteQuery, (error, results) => {
      if (error) {
        console.error('Logları silme hatası:', error);
        return res.status(500).json({ error: 'Logları silme hatası' });
      }
  
      connection.end();
      res.json({ success: true });
    });
  });

module.exports = router;