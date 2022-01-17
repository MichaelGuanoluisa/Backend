const httpError = (res, err) => {
  console.log(err);
  return res.status(500).send({ error: err });
};

module.exports = { httpError };
