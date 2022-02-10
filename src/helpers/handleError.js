const httpError = (res, err) => {
  console.log(err);
  return res.status(503).send({ error: err.message });
};

module.exports = { httpError };
