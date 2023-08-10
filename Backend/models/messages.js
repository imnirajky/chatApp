const { Schema, model } = require('mongoose');

//define schema i.e blue print
const chatMessageSchema = new Schema({
    sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    content: { type: String, required: true },
    chat: { type: Schema.Types.ObjectId, ref: 'ChatSchema' },
    timestamp: { type: Date, default: Date.now }
});

// create a model using this schema 
module.exports = model('ChatMessage', chatMessageSchema);