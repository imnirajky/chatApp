const express = require('express');
const cors = require('cors');
const PORT = 5000;
const app = express();
const connectDB = require('./config/config');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const chatController = require('./controllers/chat');
const messageController = require('./controllers/message');

app.use(cors());
app.use(express.json());
connectDB();


app.post('/api/signup', async(req, res) => {
    bcrypt.hash(req.body.password, 10, async(err, hash) => {
        if (err) {
            console.log('Error in password hashing', err);
            res.json({ status: 'Error in password hashing' });
            return;
        }
        try {
            req.body.password = hash;
            const user = await User.create(req.body);
            res.json({ status: 'OK' });
        } catch (err) {
            res.json({ status: 'error', error: 'Email already register or Inputs Not Valid' });
        }
    });
});



app.post('/api/login', async(req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user) {
            return res.json({ status: 'error', message: 'User not found' });
        }

        const passwordMatch = await bcrypt.compare(req.body.password, user.password);

        if (!passwordMatch) {
            return res.json({ status: 'error', message: 'Password Entered Incorrect' });
        }

        // JWT token generation and response
        const token = jwt.sign({
                _id: user._id, // Include the user's _id in the payload
                email: user.email,
                name: user.name,
            },
            'secret12312'
        );

        return res.json({ status: 'OK', user: token });
    } catch (err) {
        console.error('Error occurred:', err);
        res.json({ status: 'error', message: 'Error occurred during login' });
    }
});


app.get('/api/chat/', chatController.fetchChats);
app.post('/api/chat/', chatController.accessChat);
app.get('/api/message/:chatId', messageController.allMessages);
app.post('/api/message/', messageController.sendMessage);



app.listen(PORT, () => {
    console.log(`Server Launched on PORT: ${PORT}`);
});