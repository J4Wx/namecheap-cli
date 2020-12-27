const publicIp = require('public-ip');

module.exports = async () => {
    const ip = await publicIp.v4();
    return ip;
}
