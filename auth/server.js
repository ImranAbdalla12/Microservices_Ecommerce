const express = require('express')
const { readdirSync } = require('fs');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const {erroHandler} = require("./middlewares/error-handler")

//Load Config 
dotenv.config({ path: './config/config.env' });

//db connecnt 
connectDB();

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