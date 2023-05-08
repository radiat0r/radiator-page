const contactformular = async () => {
  var form = document.getElementById("contactformular");
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // smtpjs settings
  var emailConfig = {
    SecureToken: "7ee76e43-fcd4-495f-a5c0-2b32cff5223a",
    To: "info@radiator.run",
    From: "radixradiator@gmail.com",
    Subject: "Neue Kontaktanfrage",
    Body: "Name: " + name + "<br>" + "E-Mail: " + email + "<br>" + "Nachricht: " + message
  };

  // send email with smtpjs
  Email.send(emailConfig).then(
    function (response) {
      Notiflix.Notify.success("E-Mail sent successfully!")
      form.reset();
    },
    function (error) {
      Notiflix.Notify.error("E-Mail could not be sent!", error)
    }
  );
}

// working -> this info has to be deleted before publishing
// API FE3A70B50E7D286787A5BBFB8E58E943B2ABC91D0CE893D8AFBB4B3F4184E8576EE7F48A1A5BD4DB675ECB7070EF89DC
// PW 8EA3FE37E39BDAE62D1ED34872DFCF2C6297
// TOKEN PORT 2525 7ee76e43-fcd4-495f-a5c0-2b32cff5223a