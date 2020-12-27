const { Command } = require('commander');
const Config = require('./commands/Config');
const ListDomains = require('./commands/ListDomains');
const ListHosts = require('./commands/ListHosts');
const SetHost = require('./commands/SetHost');

const Program = new Command();

Program
    .version('0.0.2')
    .description('An application for interaction with the Namecheap API')
    .addCommand(Config.get())
    .addCommand(Config.set())
    .addCommand(ListDomains())
    .addCommand(ListHosts())
    .addCommand(SetHost());

Program.parseAsync();
