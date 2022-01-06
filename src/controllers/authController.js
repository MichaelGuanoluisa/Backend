const User = require("../models/users");
const Role = require("../models/role");
const jwt = require("jsonwebtoken");
const res = require("express/lib/response");
const { httpError } = require("../helpers/handleError");
//const config = require('../config');

exports.register = async (req, res) => {
  //obtener datos
  const { name, lastname, email, password, roles } = req.body;

  try {
    const user = await User.findOne({ email: email });

    if (!user) {
      const newUser = new User({
        name,
        lastname,
        email,
        password: await User.encryptPassword(password),
      });

      if (roles) {
        const foundRoles = await Role.find({ name: { $in: roles } });
        newUser.roles = foundRoles.map((role) => role._id);
      } else {
        const role = await Role.findOne({ name: "user" });
        newUser.roles = [role._id];
      }

      //guardar usuario
      await newUser.save();
      res.status(200).send({ message: "Usuario registrado con exito" });
    } else {
      res.send({ message: "Este usuario ya esta registrado" });
    }
  } catch (e) {
    httpError(res, e);
  }
};

exports.login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).send({ message: "usuario no encontrado" });
    }

    const roles = await Role.find({ _id: { $in: user.roles } });
    const roleName = await roles[0].name;

    const matchPassword = await User.comparePassword(
      req.body.password,
      user.password
    );

    if (!matchPassword) {
      return res.status(401).send({ message: "Contraseña incorrecta" });
    }

    req.token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: 86400, //24h
    });

    return res
      .status(200)
      .send({ token: req.token, user: user, role: roleName });
  } catch (e) {
    httpError(res, e);
  }
};

exports.me = async (req, res) => {
  try {
    //obtener token
    const token = req.headers["x-access-token"];

    //extraer datos del token
    const decoded = this.decoded(token);

    //comprobar si el usuario existe
    const user = await User.findById(decoded.id, { password: 0 });
    if (!user) {
      return res.status(404).json({ message: "usuario no activo" });
    } else {
      return res.send({ user: user });
    }
  } catch (error) {
    return res.status(401).json({ message: "token invalido" });
  }
};

exports.logout = (req, res) => {
  try {
    const token = req.headers["x-access-token"];
    if (!token) return res.status(403).send({ message: "Inicie sesión" });
    res.status(200).send({ msg: "logged out" });
  } catch (error) {
    return res.status(500).send({ message: error });
  }
};

exports.decoded = (token) => {
  try {
    if (!token) {
      return res.status(403).send({ message: "Inicie sesión" });
    }
    return (decoded = jwt.verify(token, process.env.SECRET_KEY));
  } catch (error) {
    httpError(res, e);
  }
};
