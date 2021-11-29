const mongoose = require("mongoose");
const User = require("../models/users");
const Role = require("../models/role");
const jwt = require("jsonwebtoken");
//const config = require('../config');

exports.register = async (req, res) => {
  let data = req.body;
  //obtener datos
  let { name, lastname, email, password, roles } = data;

  //crear nuevo usuario con su password encriptada
  const newUser = new User({
    name,
    lastname,
    email,
    password: await User.encryptPassword(password),
  });

  // Roles
  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } });
    newUser.roles = foundRoles.map((role) => role._id);
  } else {
    const role = await Role.findOne({ name: "user" });
    newUser.roles = [role._id];
  }

  //guardar usuario
  const savedUser = await newUser.save();

  //generar token
  const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY, {
    expiresIn: 86400, //24h
  });

  console.log(newUser);

  res.send({ token });
};

exports.login = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });
  if (!userFound){
    return res.status(400).json({ message: "usuario no encontrado" });
  }

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword){
    return res
    .status(401)
    .json({ token: null, message: "Contraseña incorrecta" });
  }
    
  console.log(userFound);
  const token = jwt.sign({ id: userFound._id }, process.env.SECRET_KEY, {
    expiresIn: 86400, //24h
  });
  res.send({ token });
};
