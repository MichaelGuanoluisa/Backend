const express = require("express");
const morgan = require("morgan");
const libs = require("./libs/initialSetup");
const dotenv = require("dotenv");
const cors = require("cors");

//swagger
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerDocument = require("../swagger.json");

dotenv.config();
require("./libs/database");

//Crear roles
libs.createRoles();

//inicialización de rutas
const app = express();

//Mensaje de petición
app.use(morgan("dev"));

//cors para todas las rutas
app.use(cors());

//rutas
const routes = require("./routes");

//middlewares
app.use(express.urlencoded({ extended: false }));

// parse application/json
app.use(express.json());

//carpetas publicas
app.use(express.static("public/uploads"));

//rutas
app.use("/api", routes);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

//inicialización de base de datos
const port = process.env.PORT || 3030;
app.listen(port);
console.log("Escuchando puerto", port);

module.exports = app;
