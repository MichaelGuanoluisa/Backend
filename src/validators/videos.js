exports.validate = (req) => {
  const { description, type, title, url } = req.body;
  const message = { error: [] };

  if (!title) {
    message.error.push("El titulo es requerido");
  }
  if (typeof title !== "string") {
    message.error.push("El titulo ingresado es incorrecto");
  }
  if (!description) {
    message.error.push("La descripcion es requerida");
  }
  if (!type) {
    message.error.push("El tipo de video es requerido");
  }
  if (type !== "niños" && type !== "familia" && type !== "jovenes") {
    message.error.push(
      "La donacion debe ser uno de 3 tipos: niños, jovenes o familia"
    );
  }
  if (typeof type !== "string") {
    message.error.push("El tipo de video tiene un formato incorrecto");
  }
  if (!url) {
    message.error.push("La url es requerida");
  }
  if (typeof url !== "string") {
    message.error.push("La url tiene un formato incorrecto");
  }

  if (message?.error?.length != 0) {
    return message;
  }
};

exports.validateUpdate = (req) => {
  const { description, type, title, url } = req.body;
  const message = { error: [] };

  if (title) {
    if (typeof title !== "string") {
      message.error.push("El titulo ingresado es incorrecto");
    }
  }

  if (description) {
    if (typeof description !== "string") {
      message.error.push("El titulo ingresado es incorrecto");
    }
  }
  if (type) {
    if (type !== "niños" && type !== "familia" && type !== "jovenes") {
      message.error.push(
        "La donacion debe ser uno de 3 tipos: niños, jovenes o familia"
      );
    }
    if (typeof type !== "string") {
      message.error.push("El tipo de video tiene un formato incorrecto");
    }
  }
  if (url) {
    if (typeof url !== "string") {
      message.error.push("La url tiene un formato incorrecto");
    }
  }

  if (message?.error?.length != 0) {
    return message;
  }
};
