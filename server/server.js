require('dotenv').config(); 

const express = require('express')
const app = express();
const db = require('./db');
const userroutes = require('./Routes/SignUp');
app.use(express.json());
// const bodyParser = require('body-parser'); 
// app.use(bodyParser.urlencoded({ extended: true }));

app.use('/', userroutes);

app.listen(4000, () => {
    console.log('Server is running on port 3000');
});