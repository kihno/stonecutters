const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const MessageSchema = new Schema(
    {
        text: { type: String, required: true, maxLength: 100 },
        timestamp: { type: Date, default: Date.now },
        sender: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    }
)

MessageSchema.virtual('url').get(function() {
    return `/stonecutters/message/${this._id}`;
});

MessageSchema.virtual('timestamp_formatted').get(function() {
    return DateTime.fromJSDate(this.timestamp).toLocaleString(DateTime.DATETIME_SHORT);
});

module.exports = mongoose.model('Message', MessageSchema);