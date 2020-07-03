var alreadySent = false;

function sendMail(){

    var toEmail = document.getElementById('email').value;
    var subject = document.getElementById('subject').value;
    var message = document.getElementById('message').value;
    
    if (toEmail === "" || message === "" || subject === ""){
        return ""
    }

    if (alreadySent){
        return
    }
    var data = {
        toEmail: toEmail,
        subject: subject,
        message: message
    }

    var sendMail = firebase.functions().httpsCallable('sendMail')
    sendMail(data).then(function(result) {
        console.log(result);
    }).catch(function(error) {
        // Getting the Error details.
        var code = error.code;
        var message = error.message;
        var details = error.details;
        console.log(code + message + details)
        console.log("error: " + error);
    });


    var successText = document.getElementsByClassName("sent-text")[0];

    successText.style.display = "block"
    alreadySent = true;
    return false;
}

