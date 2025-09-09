const express = require("express");
const router = express.Router();
const mysql = require('mysql2');
require('dotenv').config();

router.post('/online-api', (req, res) => {
    const { visitorIP,page } = req.body;
    const connection = mysql.createConnection(process.env.DATABASE_URL);
 
    const updateQuery = `
      UPDATE info
      SET active_status = UNIX_TIMESTAMP() + 6,
          page ='${page}'
      WHERE ip ='${visitorIP}'
    `;
    
    connection.query(updateQuery, (error, results) => {
      if (error) {
        console.error('hata:', error);
        return res.status(500).json({ error: 'hata' });
      }
      connection.end();
      res.json({ success: true });
    });
});

  module.exports = router;