const {User} = require('../../models/user.model');

const authenticate = function (req, res, next) {
    const token = req.header('x-auth');

    User.findByToken(token)
        .then(user => {
            if (!user) {
                return Promise.reject('User doesn\'t exist');
            }

            req.user = user;
            req.token = token;
            return next();
        })
        .catch(e => {
            return res.status(401).send(e);
        });
}

module.exports = {authenticate};