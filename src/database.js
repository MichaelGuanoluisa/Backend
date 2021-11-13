const mongoose = require('mongoose')

mongoose.connect("mongodb://localhost:27017/backend")
    .then(db => console.log('DB esta conectada'))
    .catch(error => console.log(error))