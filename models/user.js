const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//create user schema & model
const userSchema = new Schema({
    userId:{
        type: String,
        required: [true, 'userId is required']
    },
    name: { type: String, required: [true, 'Name Field is required'] },
    deviceToken: { type: String },
    isPremiumUser: {
        type: Boolean,
        default: false
    },
    robotIdList: {
        type: Array,
    }
});

const User = mongoose.model('user', userSchema);

module.exports = User;