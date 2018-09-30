var request = require('request');
var argvs = require('yargs');

//command and options
var argv = argvs
    .options({
        address: {
            demand: true,
            alias: 'a',
            string: true,
            describe: 'Address to fetching weather for'
        }
    })
    .help()
    .alias('help', 'h')
    .argv;

//encode and decode url parameters
var encodeAddress = encodeURIComponent(argv.address);
//send a request to backend and get an response
request({
    url: `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeAddress}&key=AIzaSyBQtcQWWgrH4Pic_1nCwuiudxO-gYmNORU`,
    json: true
}, (error, response, body) => {
    //console.log(JSON.stringify(body, undefined, 2));
    console.log(JSON.stringify(body));
});