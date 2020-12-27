const Program = require('commander');
const Config = require('../lib/LoadConfig');

const handler = async (option, field, value) => {
    const config = await Config.loadConfig();

    if (!(['get', 'set'].includes(option.toLowerCase()))) {
        console.log(`Invalid <option>, must be get or set. User input ${option}`);
        return;
    }

    if ('get' === option.toLowerCase()) {
        const value = config[field];

        if (value) {
            console.log(`The current config setting for ${field} is ${value}`);
        } else {
            console.log(`The config value for ${field} is currently unset. You can set it with 'config set ${field} <value>'.`);
        }
    }

    if ('set' === option.toLowerCase()) {
        if (undefined === value) {
            console.log('[value] is required in when using set!');
        }

        config[field] = value;

        Config.updateConfig(config);
    }
}

module.exports = () => {
    return Program
        .command('config <option> <field> [value]')
        .description('Interact with the config', {
            option: 'Whether you want to get a variable or set a variable.',
            field: 'The field you want to modify.',
            value: 'Required if you\'re setting a value. The value you want to enter.'
        })
        .action(handler);
}
