 /*
    console.log("test!")
    Email.send({
        Host : "smtp.elasticemail.com",
        Username : "radixradiator@gmail.com",
        Password : "F0D2F96AAA6D5E6AA084D8E80458A81E6494",
        To : 'martin.koetzing@gmail.com',
        From : "radixradiator@gmail.com",
        Subject : "This is the subject",
        Body : "And this is the body"
    }).then(
    message => alert(message)
    );
*/

// pw: F0D2F96AAA6D5E6AA084D8E80458A81E6494
// token: 7779d413-d224-468f-936b-9ac5e0b8086c

// Event-Listener zum Abfangen des Absendeereignisses des Formulars
document.getElementById("contact-form").addEventListener("submit", function(e) {
  e.preventDefault(); // Verhindert das Standardverhalten des Formulars (Seitenneuladung)

  // Die Daten aus dem Formular abrufen
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var message = document.getElementById("message").value;

  // E-Mail-Einstellungen für den SMTP.js-Dienst
  var emailConfig = {
    SecureToken: "7779d413-d224-468f-936b-9ac5e0b8086c",
    To: "info@radiator.run",
    From: email,
    Subject: "Neue Kontaktanfrage",
    Body: "Name: " + name + "<br>" + "E-Mail: " + email + "<br>" + "Nachricht: " + message
  };

  // E-Mail senden mit SMTP.js
  Email.send(emailConfig).then(
    function(response) {
      alert("E-Mail erfolgreich gesendet!"); // Erfolgsbenachrichtigung
      // Hier kannst du weitere Aktionen nach dem Versenden der E-Mail ausführen
    },
    function(error) {
      console.error("E-Mail konnte nicht gesendet werden:", error); // Fehlermeldung
      // Hier kannst du Fehlerbehandlungsmaßnahmen ergreifen, wenn das Senden fehlschlägt
    }
  );
});