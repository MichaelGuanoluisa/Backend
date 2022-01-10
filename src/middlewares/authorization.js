const jwt = require("jsonwebtoken");
const User = require("../models/users");
const Role = require("../models/role");
//const config = require('../config');

exports.verifyToken = async (req, res, next) => {
  try {
    //obtener token
    const token = req.headers["x-access-token"];

    //comprobar si se ingresa token
    if (!token) return res.status(403).json({ message: "Inicie sesión" });

    //extraer datos del token
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    req.userId = decoded.id;

    //comprobar si el usuario existe
    const user = await User.findById(req.userId, { password: 0 });
    if (!user)
      return res.status(404).json({ message: "usuario no registrado" });

    data = req.body;
    //si existe continua
    next();
  } catch (error) {
    return res.status(401).json({ message: "token invalido" });
  }
};

/*exports.isUser = async (req, res, next) =>{

}*/
//comprobar si es el usuario administrador
exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      return next();
    } else {
      return res.status(403).json({ message: "requiere rol administrador" });
    }
  }
};

exports.isUser = async (req, res, next) => {
  const user = await User.findById(req.userId);
  const roles = await Role.find({ _id: { $in: user.roles } });

  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "user") {
      return next();
    } else {
      return res.status(403).json({ message: "requiere iniciar sesion" });
    }
  }
};
