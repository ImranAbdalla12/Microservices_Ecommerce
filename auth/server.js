const express = require('express')
const { readdirSync } = require('fs');
const cors = require('cors');
const morgan = require('morgan');

const {erroHandler} = require("./middlewares/error-handler")

const app = express()
app.use(express.json())
app.use(morgan('dev'));
app.use(cors());

readdirSync('./routes').map((r) => app.use('/api', require('./routes/' + r)));
app.use(erroHandler)

const PORT = 3000
app.listen(PORT, () => {
    console.log(`Server Listening on post ${PORT}`)
})