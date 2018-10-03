const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const bycrpt = require('bcryptjs');
const _ = require('lodash');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        minlength: 1,
        trim: true,
        unique: true,
        validate: {
            validator: (value) => {
                return validator.isEmail(value);
            },
            message: '{VALUE} is not valid email'
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    tokens: [{
        access: {
            type: String,
            required: true
        },
        token: {
            type: String,
            required: true
        }
    }]
});


UserSchema.pre('save', function (next) {
    let user = this;

    if (user.isModified('password')) {
        bycrpt.genSalt(10, (err, salt) => {
            if (err) return next(err);
            bycrpt.hash(user.password, salt, (err, hash) => {
                if (err) return next(err);
                user.password = hash;
                return next();
            });
        })
    } else {
        return next();
    }
});

UserSchema.methods.convertToJSON = function () {
    let user = this;
    let userObject = user.toObject();

    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.methods.generateAuthToken = function () {
    let user = this;
    let access = 'auth';
    //payload and secret to generate token
    //convert ObjectID to 24 hex string
    let token = jwt.sign({id: user._id.toHexString(), access}, 'abc123');
    user.tokens.push({access, token});

    return user.save().then(() => {
        return token;
    });
}

UserSchema.statics.findByToken = function (token) {
    let user = this;
    let decode;

    try {
        decode = jwt.verify(token, 'abc123');
    } catch (e) {
        return Promise.reject(e);
    }

    return user.findOne({
        '_id': decode.id,
        'tokens.token': token,
        'tokens.access': 'auth'
    });
}

const User = mongoose.model('users', UserSchema);

module.exports = {User};