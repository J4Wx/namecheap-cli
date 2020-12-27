const Config = require('./LoadConfig');
const Namecheap = require('./LoadNamecheap');
const getIpAddress = require('./getIpAddress');

module.exports = async () => {
    const config = await Config.loadConfig();

    if (config.username === undefined || config.apiKey === undefined) {
        console.log('You need to set your username and apiKey in the config. Check the readme!');
        return;
    } 

    const ip = await getIpAddress();

    return Namecheap(config.username, config.apiKey, ip);
}
