const contactformular = async () => {
  var form = document.getElementById("contactformular");
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // smtpjs settings
  var emailConfig = {
    SecureToken: "7ee76e43-fcd4-495f-a5c0-2b32cff5223a",
    To: "info@radiator.run",
    From: "info@radiator.run",
    Subject: "Neue Kontaktanfrage",
    Body: "Name: " + name + "<br>" + "E-Mail: " + email + "<br>" + "Nachricht: " + message
  };

  // send email with smtpjs
  Email.send(emailConfig).then(
    (response) => { 
      console.log(response);
      if (response == "OK") {
        Notiflix.Notify.success("E-Mail sent successfully!")
        form.reset();
      }
    }
  )
  .catch(
    (response) => { 
      console.log(response);
      Notiflix.Notify.failure(response)
    }
  );
}



/* SmtpJS.com - v3.0.0 
var Email = {
  send: function(a) {
      return new Promise(function(n, e) {
          a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send";
          var t = JSON.stringify(a);
          Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function(e) {
              n(e)
          })
      })
  },
  ajaxPost: function(e, n, t) {
      var a = Email.createCORSRequest("POST", e);
      a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function() {
          var e = a.responseText;
          null != t && t(e)
      }, a.send(n)
  },
  ajax: function(e, n) {
      var t = Email.createCORSRequest("GET", e);
      t.onload = function() {
          var e = t.responseText;
          null != n && n(e)
      }, t.send()
  },
  createCORSRequest: function(e, n) {
      var t = new XMLHttpRequest;
      return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t
  }
};
*/