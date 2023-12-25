const express = require('express')
const router = require('./router/router')
const bodyParser = require('body-parser')

const app = new express()
const PORT = process.env.PORT || 8080



app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Allow-Origin", "*");
    next();
});
app.use(bodyParser.json())
app.use(express.json())
app.use('/api', router)
app.listen(PORT, () => {
    console.log(`I started on ${PORT}`)
})
