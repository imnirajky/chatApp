const Message = require('../models/message');
const User = require('../models/user');
const Conversation = require('../models/conversation');

exports.sendMessage = async(req, res) => {
    try {
        // assume that sender, receiver contains email of the user
        const { sender, receiver, messageContent } = req.body;

        const user1 = await User.findOne({ email: sender });
        const user2 = await User.findOne({ email: receiver });

        // user1 and user2 contains document
        const conversationDocument = await Conversation.findOne({
            $or: [
                { participants: [user1._id, user2._id] },
                { participants: [user2._id, user1._id] },
            ]
        });
        // 1. check if conversation exists or not if sender and receiver are present as participants in any conversation 
        // 2. if Exists
        // -create message and store it
        //. if not Exists
        // -create conversation then store message
        if (!conversationDocument) {
            const newConversation = new Conversation({
                participants: [user1._id, user2._id],
                messages: []
            });
            await newConversation.save();
            conversationDocument = await Conversation.findOne({ participants: [user1._id, user2._id] });
        }

        const newMessage = new Message({
            sender: user1._id,
            receiver: user2._id,
            messageContent,
            conversationId: conversationDocument._id
        });
        await newMessage.save();

        //update in conversation's message array
        await Conversation.updateOne({ _id: conversationDocument._id }, { $push: { messages: newMessage } });

        //TODO emit the message to the recipient in real-time using WebSocket or Socket.io
        res.status(200).json({ message: 'message Saved!!' });
    } catch (error) {
        res.status(500).json({ Error: 'Error sending message' });
    }
}