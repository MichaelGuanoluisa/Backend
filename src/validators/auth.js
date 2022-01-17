exports.validate = (req) => {
  const { name, lastname, email, password } = req.body;
  const message = { error: [] };
  if (!name) {
    message.error.push("El nombre es requerido");
  }
  if (typeof name != "string") {
    message.error.push("El nombre tiene un formato incorrecto");
  }
  if (name?.length <= 5 && !/^[a-z]+$/i.test(name)) {
    message.error.push(
      "El nombre tiene que ser de al menos 5 caracteres solo [a-z]"
    );
  }
  if (!lastname) {
    message.error.push("El apellido es requerido");
  }
  if (typeof lastname != "string") {
    message.error.push("El apellido tiene un formato incorrecto");
  }
  if (lastname?.length <= 5 && !/^[a-z]+$/i.test(lastname)) {
    message.error.push(
      "El apellido tiene que ser de al menos 5 caracteres solo [a-z]"
    );
  }
  if (!email) {
    message.error.push("El correo es requerido");
  }
  if (typeof email != "string") {
    message.error.push("El correo tiene un formato incorrecto");
  }
  if (!password) {
    message.error.push("La contraseña es requerida");
  }
  if (password?.length < 8) {
    message.error.push("La contraseña tiene que ser de al menos 8 caracteres");
  }
  if (message?.error?.length != 0) {
    return message;
  }
};

exports.validateLogin = (req) => {
  const { email, password } = req.body;
  const messages = { error: [] };

  if (!email) {
    messages.error.push("El correo es requerido");
  }
  if (typeof email != "string") {
    messages.error.push("El correo tiene un formato incorrecto");
  }

  if (!password) {
    messages.error.push("La contraseña es requerida");
  }
  if (password?.length < 8) {
    messages.error.push("La contraseña tiene que ser de al menos 8 caracteres");
  }
  if (messages?.error?.length != 0) {
    return messages;
  }
};
