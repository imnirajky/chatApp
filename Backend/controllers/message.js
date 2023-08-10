const Chat = require('../models/chat');
const User = require('../models/user');
const Message = require('../models/messages');
// const asyncHandler = require('express-async-handler');
//It uses the asyncHandler function, which is likely a middleware that handles asynchronous functions and errors.
//get all messages of a user
const allMessages = async(req, res) => {
    try {
        const messages = await Message.find({ chat: req.params.chatId })
            .populate("sender", "name, email")
            .populate("chat");
        res.status(200).json(messages);
    } catch (error) {
        res.status(400);
        //400 Bad Request response:
        throw new Error(error.message);
    }
}




// create new message
const sendMessage = async(req, res) => {
    // Hi SA  123SA
    const { content, chatId } = req.body;
    if (!content || !chatId) {
        console.log("Invalid data passed into request");
        return res.sendStatus(400);
    }

    let newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId
    }

    try {
        let message = await Message.create(newMessage);
        message = await message.populate("sender", "name, email").populate("chat");
        await Chat.findByIdAndUpdate(req.body.chatId, { latestMessage: message });

        res.status(200).json(message);
    } catch (error) {
        res.status(400);
        throw new Error(error.message);
    }
}

module.exports = {
    sendMessage,
    allMessages
}