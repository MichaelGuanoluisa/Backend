const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const libs = require("./libs/initialSetup");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
require("./libs/database");

//Crear roles
libs.createRoles();

//inicialización de rutas
const app = express();

//Mensaje de petición
app.use(morgan("dev"));

//cors para todas las rutas
app.use(
  cors({
    origin: "http://127.0.01:3000",
  })
);

//rutas
const routes = require("./routes");

//middlewares
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

//carpetas publicas
app.use(express.static("uploads"));

//rutas
app.use("/api", routes);

//inicialización de base de datos
const port = process.env.PORT || 3030;
app.listen(port);
console.log("Escuchando puerto", port);
