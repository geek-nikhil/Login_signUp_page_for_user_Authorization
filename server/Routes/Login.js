const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Import the User model
const {jwtAuthMiddleware,generateToken} = require('../jwt');  

router.get('/', jwtAuthMiddleware , async (req, res) => {
   const user = req.user;
   const Users = await User.find();

    res.send(Users);
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
