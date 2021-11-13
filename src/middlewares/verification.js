
const {Roles} = require('../models/role');

exports.checkRolesExisted = (req, res, next) =>{
    if(req.body.roles){
        for(let i = 0; i < req.body.roles.length; i++){
            if(!Roles.includes(req.body.roles[i])){
                 return res.status(400).json({
                     message: `Rol ${req.body.roles[i]} no existe`
                 })
            }
        }
    }
    next();
}