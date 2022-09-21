const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema(
    {
        first_name: { type: String, required: true, maxLength: 100 },
        last_name: { type: String, required: true, maxLength: 100 },
        username: { type: String, required: true, maxLength: 100 },
        password: { type: String, required: true }
    }
)

UserSchema.virtual('url').get(function() {
    return `/members/${this._id}`;
});

UserSchema.virtual('full_name').get(function() {
    let fullname = '';
    if (this.first_name && this.last_name) {
        fullname = `${this.first_name} ${this.last_name}`
    }
    if (!this.first_name || !this.last_name) {
        fullname = this.first_name || this.last_name;
    }
    return fullname;
})

module.exports = mongoose.model('User', UserSchema);