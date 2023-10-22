const express = require('express');
const cors = require('cors');
const PORT = 5000;
const app = express();
const connectDB = require('./config/config');
const userController = require('./controllers/userController');
const chatController = require('./controllers/chatController');
const jwt = require('jsonwebtoken');

app.use(cors());
app.use(express.json());
connectDB();



app.post('/api/signup', userController.registerUser);
app.post('/api/login', userController.loginUser);
app.use('/chat', (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        jwt.verify(token, 'lotus@123', (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: err });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({ message: 'No JWT token Found!!!' });
    }
});
app.post('/chat/send', chatController.sendMessage);

app.listen(PORT, () => {
    console.log(`Server Launched on PORT: ${PORT}`);
});