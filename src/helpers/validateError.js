const Error = (res, data) => {
  return res.status(406).send(data);
};

module.exports = { Error };
