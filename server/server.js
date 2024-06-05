const express = require('express')
const app = express();
const db = require('./db');
const User = require('./models/user');


const bodyParser = require('body-parser'); 
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.post('/', async (req, res) => {
    try{
        const data = req.body // Assuming the request body contains the person data

        // Create a new Person document using the Mongoose model
        const newUser = new User(data);

        // Save the new person to the database
        const response = await newUser.save();
        console.log('data saved');

        // const payload = {
        //     id: response.id,
        //     username: response.username
        // }
        // console.log(JSON.stringify(payload));
        // const token = generateToken(payload);
        // console.log("Token is : ", token);

        res.status(200).json({response: response});
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})

app.listen(4000, () => {
    console.log('Server is running on port 3000');
});