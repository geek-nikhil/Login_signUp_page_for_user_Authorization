const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser');
const {jwtmiddleware,generateToken} = require('../jwt');  
// Middleware to parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse application/json
router.use(bodyParser.json());

// Define routes
router.get('/', (req, res) => {
    res.send('Hello World!');
});

router.post('/', async (req, res) => {
    try {
        const data = req.body; // Assuming the request body contains the user data

        // Create a new User document using the Mongoose model
        const newUser = new User(data);

        // Save the new user to the database
        const response = await newUser.save();
        console.log('Data saved');
        const payload = {
            email: response.id,
            username: response.email,
        };
       const Token = generateToken(payload);
       console.log(Token);
       
        res.status(201).json({response:response,token:Token});
        // Redirect to the desired URL
        // res.redirect('http://localhost:3000/');
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
