const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const session = require('express-session')
const secret = {secret: 'dev', resave: false, saveUninitialized: true, cookie: {}}


app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}))
app.use(session(secret))
app.use('/',routes)

app.listen(port, () => console.log('listening port', port))