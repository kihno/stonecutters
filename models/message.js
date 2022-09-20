const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        title: { type: String, required: true, maxLength: 100 },
        timestamp: { type: Date, default: Date.now },
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    }
)

MessageSchema.virtual('url').get(function() {
    return `/stonecutters/message/${this._id}`;
});

module.exports = mongoose.model('Message', MessageSchema);