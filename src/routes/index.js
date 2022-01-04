const express = require("express");
const router = express.Router();
const fs = require("fs");

const pathRouter = `${__dirname}`;

const removeExtension = (filename) => {
  return filename.split(".").shift();
};

fs.readdirSync(pathRouter).filter((file) => {
  const fileWithOutExt = removeExtension(file);
  const skip = ["index"].includes(fileWithOutExt);
  if (!skip) {
    router.use(`/${fileWithOutExt}`, require(`./${fileWithOutExt}`));
    console.log("Ruta -------> ", fileWithOutExt);
  }
});

router.get("*", (req, res) => {
  res.send({ error: "no se encontro la ruta" }, 404);
});

module.exports = router;
