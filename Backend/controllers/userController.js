const User = require('../models/user');
const jwt = require('jsonwebtoken');

exports.registerUser = async(req, res) => {
    const { name, email, password } = req.body;

    try {
        const user = new User({ name, email, password });
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Registration Failed' });
    }
}


exports.loginUser = async(req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
        }

        const isPasswordValid = (user.password == password);

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
        } else {
            const authenticatedUser = {
                email: user.email,
            };
            const token = jwt.sign(authenticatedUser, 'lotus@123');
            res.status(200).json({ token });
        }

    } catch (error) {
        res.status(500).json({ error: 'Login Failed' });
    }
}