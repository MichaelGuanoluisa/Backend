const User = require("../models/users");
const mongoose = require("mongoose");
const sendEmail = require("../libs/sendEmail");
//const Joi = require("joi");
const validations = require("../validators/password-reset")
const express = require("express");
const router = express.Router();


const parseId = (id) => {
  return mongoose.Types.ObjectId(id);
};

router.post("/", async (req, res) => {
  try {
    // const schema = Joi.object({ email: Joi.string().email().required() });
    // const { error } = schema.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);

    const errors = validations.validate(req);
    if (errors) {
      return res.status(406).send(errors);
    } else {
      const user = await User.findOne({ email: req.body.email });
      console.log(req.body.email)
      if (!user)
        return res.status(400).send({message: "No existe usuario registrado con este email"});

      const link = `https://ifgf.vercel.app/reset-password/${user._id}`;
      sendEmail(user, "Recuperación de contraseña", link);

      res.status(200).send("Se ha enviado el correo con éxito");
    }
  } catch (error) {
    res.status(503).send(`Ha ocurrido un error :C : ${error.message}` );
    console.log(error);
  }
});

router.post("/:userId", async (req, res) => {
  try {
    // const schema = Joi.object({ password: Joi.string().required() });
    // const { error } = schema.validate(req.body);
    // if (error) return res.status(400).send(error.details[0].message);
    const id = req.params.userId
    const errors = validations.validatePassword(req);
    if (errors) {
      return res.status(406).send(errors);
    } else {
      const user = await User.findById(id);
      if (!user) return res.status(400).send("Link inválido o caducado");

      const password = await User.encryptPassword(req.body.password);
      req.body.password = password;

      await User.updateOne({ _id: parseId(id) }, req.body); 
      res.status(200).send("Contraseña actualizada con éxito");
    }
  } catch (error) {
    console.log(error);
    res.status(503).send(`Ha ocurrido un error :C : ${error.message}`);
  }
});

module.exports = router;
