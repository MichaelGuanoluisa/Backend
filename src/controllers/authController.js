const mongoose = require("mongoose");
const User = require("../models/users");
const Role = require("../models/role");
const jwt = require("jsonwebtoken");
//const config = require('../config');

exports.register = async (req, res) => {
  let data = req.body;
  //obtener datos
  let { name, lastname, email, password, roles } = data;

  const userFound = await User.findOne({ email: req.body.email });
  if(userFound){
    res.send({message: "Este usuario ya esta registrado"})
  }

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
  /*const token = jwt.sign({ id: savedUser._id }, process.env.SECRET_KEY, {
    expiresIn: 86400, //24h
  });
  */
  res.send({ message: "Usuario registrado con exito" });
};

exports.login = async (req, res) => {
  const userFound = await User.findOne({ email: req.body.email });
  console.log(userFound);
  
  if (!userFound){
    return res.send({ token: "",
    message: "usuario no encontrado" });
  }

  const roles = await Role.find({ _id: { $in: userFound.roles } });
  const roleName = await roles[0].name;

  const matchPassword = await User.comparePassword(
    req.body.password,
    userFound.password
  );

  if (!matchPassword){
    return res.send({ token:"",
    message: "Contraseña incorrecta" });
  }

  const token = jwt.sign({ id: userFound._id }, process.env.SECRET_KEY, {
    expiresIn: 86400, //24h
  });
  res.send(
    { token: token,
  role: roleName}
);
};
