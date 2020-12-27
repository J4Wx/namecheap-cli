const Program = require('commander');
const Config = require('../lib/LoadConfig');

const getHandler = async (field) => {
    const config = await Config.loadConfig();

    const value = config[field];

    if (value) {
        console.log(`The current config setting for ${field} is ${value}`);
    } else {
        console.log(`The config value for ${field} is currently unset. You can set it with 'config set ${field} <value>'.`);
    }
}

const setHandler = async (field, value) => {
    const config = await Config.loadConfig();

    config[field] = value;

    Config.updateConfig(config);
}

module.exports = {
    get: () => {
        return Program
            .command('config:get <field>')
            .description('Get a value from the config config', {
                field: 'The field you want to get.',
            })
            .action(getHandler);
    },

    set: () => {
        return Program
            .command('config:set <field> <value>')
            .description('Interact with the config', {
                field: 'The field you want to modify.',
                value: 'The value you want to enter.'
            })
            .action(setHandler);
    }
}
