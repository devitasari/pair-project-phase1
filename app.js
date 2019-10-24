const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const session = require('express-session')
const secret = {secret: 'dev', resave: false, saveUninitialized: true, cookie: {}}


app.set('view engine','ejs')
app.use(express.urlencoded({extended: true}))
// <<<<<<< HEAD =
app.use(express.static('public'))
// =======
app.use(session(secret))
// >>>>>>> 7fc56812ae983ff5870c2f5de4d13084e4011ef6
app.use('/',routes)

app.listen(port, () => console.log('listening port', port))