const homedir = require('os').homedir();
const fs = require('fs');
const configFile = '.namecheap-sli.json';

module.exports = {
    loadConfig: async () => {
        var config = {}

        try {
            config = JSON.parse(await fs.readFileSync(`${homedir}/${configFile}`));
        } catch (exception) {
            fs.writeFileSync(`${homedir}/${configFile}`, JSON.stringify({}));
        }
        
        return config;
    },
    updateConfig: (config) => {
        fs.writeFileSync(`${homedir}/${configFile}`, JSON.stringify(config));
    }
}
