const contactformular = async () => {
  var form = document.getElementById("contactformular");
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // smtpjs settings
  var emailConfig = {
    SecureToken: "7779d413-d224-468f-936b-9ac5e0b8086c",
    To: "info@radiator.run",
    From: email,
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