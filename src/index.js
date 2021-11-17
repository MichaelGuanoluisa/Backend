const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const libs = require("./libs/initialSetup");
const dotenv = require("dotenv");
dotenv.config();
require("./libs/database");

//rutas
const userRoutes = require("./routes/userRoutes");
const homeRoutes = require("./routes");

//Crear roles
libs.createRoles();

//inicialización de rutas
const app = express();

//Mensaje de petición
app.use(morgan("dev"));

//middlewares
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//carpetas publicas
app.use(express.static("uploads"));

//rutas
app.use("/api/user", userRoutes);
app.use("/api", homeRoutes);

//inicialización de base de datos
const port = process.env.PORT || 3030;
app.listen(port);
console.log("Escuchando puerto", 3001);
