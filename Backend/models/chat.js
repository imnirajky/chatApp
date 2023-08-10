const { Schema, model } = require('mongoose');

const chatSchema = Schema({
    chatName: { type: String },
    isGroupChat: { type: Boolean, default: false },
    users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    latestMessage: { type: Schema.Types.ObjectId, ref: 'ChatMessage' }
});

module.exports = model('ChatSchema', chatSchema);
// model has 2 argument
// 1st is the name for the collection name(Table name)