const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: ['First name field is required!']
    },
    lastName: {
        type: String,
        required:true,
    },
    email: {
        type: String,
        required: [true, 'Username is required!'],
        unique: [true, 'Username already exists!']
    },
    password: {
        type: String,
        required: true,
    },
})

const User = mongoose.model('User', userSchema);

module.exports = User;