const nodemailer = require("nodemailer");

const sendEmail = (user, subject, text) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.HOST,
      service: process.env.SERVICE,
      port: 465,
      secure: true,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
      },
    });

    transporter.verify(function (error, success) {
      if (error) {
        console.log(error);
      } else {
        console.log("Server is ready to take our messages");
      }
    });

    transporter.sendMail({
      from: process.env.USER,
      to: user.email,
      subject: subject,
      html: `
        <h3> Hola ${user.name} ${user.lastname} </h3>
        <p>Para restaurar contraseña y recuperar tu cuenta, por favor da clic en el siguiente link: <a target="_" href="${text}">recuperar contraseña</a> </p>
        <p>Si no solicitaste la restauración de contraseña ignora este correo</p>
        <p>Gracias!</p>
      `
    }, function(err, info){
      if(err){
        console.log(err)
        return(err);
      }
      console.log('Message sent: ' + info.response);
      console.log('Message not sent: ' + info.rejected);
  });

  } catch (error) {
    console.log(error, "email not sent");
    throw new Error(error);
  }
};

module.exports = sendEmail;
