const mongoose = require('mongoose');

const User = mongoose.model('users', {
    email: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    }
});

module.exports = {User};