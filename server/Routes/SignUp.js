const express = require('express');
const router = express.Router();
const User = require('../models/user');
const bodyParser = require('body-parser');
const { jwtAuthMiddleware, generateToken } = require('../jwt');

// Middleware to parse application/x-www-form-urlencoded
router.use(bodyParser.urlencoded({ extended: true }));

// Middleware to parse application/json
router.use(bodyParser.json());

// Define routes
router.get('/signup', (req, res) => {
    res.send('Hello World!');
});

router.post('/signup', async (req, res) => {
    try {
        const userData = req.body; // Assuming the request body contains the user data

        // Create a new User document using the Mongoose model
        const newUser = new User(userData);

        // Save the new user to the database
        const savedUser = await newUser.save();

        // Generate JWT token for the user
        const payload = {
            id: savedUser._id,
            email: savedUser.email,
            username: savedUser.username,
        };
        const token = generateToken(payload);

        res.status(201).json({ user: savedUser, token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.get('/login', jwtAuthMiddleware, async (req, res) => {
    try {
        // jwtAuthMiddleware already decoded and attached user information to req.user
        const user = req.user;

        // You might want to filter the user data before sending it back
        const filteredUserData = { email: user.email, username: user.username };

        res.status(200).json({ user: filteredUserData });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

router.post('/login',async (req, res) => {
    try {
        const data = req.body;
        const user = await User.findOne({ email: data.email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email or password' });
        }

        // Additional logic for password verification can be added here
    const payload = {   
          id:user.id,
          username: user.email
    }

    const Token = generateToken(payload);
        // If authentication is successful, you can send a success response
        res.status(200).json({ message: 'Login successful', user: user ,token:Token});
    } catch (err) {
        console.log(err); // Log the error for debugging
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

module.exports = router;
