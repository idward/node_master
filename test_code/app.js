var fs = require('fs');
var os = require('os');

console.log('starting....');

var user = os.userInfo();
console.log(user);

fs.appendFile('greetings.txt', `Hello ${user.username}!`, function (err) {
    if (err) {
        console.log(err);
    }
});

