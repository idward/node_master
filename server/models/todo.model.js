const mongoose = require('mongoose');

const Todo = mongoose.model('Todos', {
    text: {
        type: String,
        required: true,
        minLength: 1,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Number,
        default: null
    }
});

module.exports = {Todo};