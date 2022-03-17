exports.validate = (req) => {
    const { email } = req.body;
    const messages = { error: [] };
  
    if (!email) {
      messages.error.push("El correo es requerido");
    }
    if (/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i.test(email)){
      console.log("La dirección de email " + email + " es correcta.");
    } else {
      messages.error.push("La dirección de email es incorrecta.");
    }
  
    if (messages?.error?.length != 0) {
      return messages;
    }else {
      return null;
    }
};

exports.validatePassword = (req) => {
    const {  password } = req.body;
    const message = { error: [] };
  
    if (!password) {
      message.error.push("La contraseña es requerida");
    }
    if (password?.length < 8) {
      message.error.push("La contraseña tiene que ser de al menos 8 caracteres");
    }
    if (message?.error?.length != 0) {
      return message;
    }else {
      return null;
    }
  };