let env = process.env.NODE_ENV || 'development';

if (env === 'development' || env === 'test') {
    let config = require('./config.json');
    let envc = config[env];
    
    Object.keys(envc).forEach(key => {
        process.env[key] = envc[key];
    });
}