const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const libs = require("./libs/initialSetup");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("./libs/database");


//rutas
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

//cors para todas las rutas
app.use(cors());

//rutas
app.use("/api", homeRoutes);

//inicialización de base de datos
const port = process.env.PORT || 3030;
app.listen(port);
console.log("Escuchando puerto", port);
