const log = require('../resources/utils/logger')
exports.procesarErrores = (fn) =>{
    return function(req,res,next){
        fn(req,res,next).catch(next)
    }
}


exports.erroresEnProduccion = (err,req,res,next) =>{
    res.status(err.status || 500)
    res.send({message: err.message})
} 

exports.erroresEnDesarrollo = (err,req,res,next) =>{
    res.status(err.status || 500)
    res.send({
        message: err.message,
        stack: err.stack || ""
    })
} 
