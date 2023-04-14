const express = require('express')
const bodyParser = require('body-parser')
const authRouter = require('./api/resources/auth/auth.route')
const usersRouter = require('./api/resources/users/users.route')
const clientsRouter = require('./api/resources/clients/clients.route')
const formsRouter = require('./api/resources/forms/forms.route')
const agesRouter = require('./api/resources/parameterizations/ages/ages.route')
const sizesRouter = require('./api/resources/parameterizations/sizes/sizes.route')
const petsRouter = require('./api/resources/parameterizations/pets/pets.route')
const surveysRouter = require('./api/resources/surveys/surveys.route')


const morgan = require('morgan');
const logger = require("./api/resources/utils/logger")
//autenticacion basica
// const auth = require('./api/libs/auth').basicStrategyLogin
// const BasicStrategy = require('passport-http').BasicStrategy
const authJTW = require('./api/libs/auth')
const config = require('./api/config')
const passport = require('passport')
const errorHandler = require('./api/libs/errorHandler')

const cors = require('cors');


const app = express()

app.use(cors())
app.use(morgan('short',{
    stream:{
        write: message => logger.info(message.trim())
    }
}))

passport.use(authJTW)

app.use(bodyParser.json())

app.use(passport.initialize())

app.use('/auth',authRouter)
app.use('/users',usersRouter)
app.use('/clients',clientsRouter)
app.use('/forms',formsRouter)
app.use('/ages',agesRouter)
app.use('/sizes',sizesRouter)
app.use('/pets',petsRouter)
app.use('/surveys',surveysRouter)




app.use(errorHandler.procesarErrores)

if(config.ambiente === 'prod'){
    app.use(errorHandler.erroresEnProduccion)
}else{
    app.use(errorHandler.erroresEnDesarrollo)
}


// app.get('/',(_req,res) => {
//     return res.send('conectado')
// })

app.listen(3000,()=>console.log('listening...survey!!!'))


//RUN MIGRATRION

//docker exec clubpedidos-back-app-1  sequelize db:migrate --env development
