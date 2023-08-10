const asyncHandler = require('express-async-handler');

const Chat = require('../models/chat');
const User = require('../models/user');


const accessChat = asyncHandler(async(req, res) => {
    // Extract userId (email ID in our case) from the request body
    const { userId } = req.body;

    // Check if userId is provided
    if (!userId) {
        console.log("UserId  not sent with request");
        return res.sendStatus(400);
    }

    // Find chats that are one-to-one (not group chats) and where both logged-in user and the requested user are participants
    var isChat = await Chat.find({
            isGroupChat: false,
            $and: [{
                    users: {
                        $elemMatch: {
                            $eq: req.user._id
                        }
                    }
                },
                {
                    users: {
                        $elemMatch: {
                            $eq: userId
                        }
                    }
                },
            ],
        })
        .populate("users", "-password") // Populate the users field of the chat with user data (except password)
        .populate("latestMessage"); // Populate the latestMessage field of the chat with the latest message data

    // Populate the sender field of the latestMessage with the name and email properties
    isChat = await Chat.populate(isChat, {
        path: "latestMessage.sender",
        select: "name email"
    });

    // If a chat exists, return the chat data; otherwise, create a new one-to-one chat
    if (isChat.length > 0) {
        res.send(isChat[0]);
    } else {
        //If no chat exists, create a new one-to-one chat
        let conversation = {
            chatName: await User.findOne({
                email: userId
            }).name,
            users: [req.user._id, userId] //sender and receiver in the chat
        };


        try {
            //create a new chat in the DB
            const createdConversation = await Chat.create(conversation);
            // fetch newly created chat/conversation and populate user data except password 
            const FullChat = await Chat.findOne({
                _id: createdConversation._id
            }).populate("users", "-password");



            // return newly created chat data 
            res.status(200).json(FullChat);
        } catch (error) {
            // If an error occurs during chat creation, send a 400 status with the error message
            res.status(400);
            throw new Error(error.message);
        }
    }
});




// This code is for fetching all the chat of a user
// For Ex. If I am logged in to this application then all the chats will be fetched of mine
// All my friends i talked to in history 

const fetchChats = asyncHandler(async(req, res) => {
    //find all the chats where the logged in user is participant
    const chats = Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password") // populate users filed with actual data, because we have only stored ObjectID there 
        .populate("latestMessage") //populate with actual data i.e message document(latest one)
        .sort({ updatedAt: -1 });

    // Populate the "latestMessage.sender" field inside each chat with the sender's details
    const populatedChats = await User.populate(chats, {
        path: "latestMessage.sender"
    });

    res.status(200).json(populatedChats);
});



module.exports = {
    fetchChats,
    accessChat
}