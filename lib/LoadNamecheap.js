const namecheap = require('namecheap-api');

module.exports = (user, key, ip = '168.119.139.140') => {
    namecheap.config.set('ApiUser', user);
    namecheap.config.set('ApiKey', key);
    namecheap.config.set('ClientIp', ip);

    return namecheap;
}
