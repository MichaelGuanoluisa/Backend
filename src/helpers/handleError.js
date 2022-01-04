const httpError = (res, err) => {
    console.log(err)
    res.send({error: err}, 500)
}

module.exports = { httpError }