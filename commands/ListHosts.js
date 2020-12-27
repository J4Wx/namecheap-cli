const Program = require('commander');
const Namecheap = require('../lib/LoadNamecheapWithConfig');
const ApiCalls = require('../lib/ApiCalls');
const { table } = require('table');

const handler = async (domain, page = 1) => {
    const NamecheapClient = await Namecheap();
    domain = domain.split('.');

    if (domain.length !== 2) {
        console.log('You must enter a single, base domain. Example: example.com');
        return;
    }

    NamecheapClient.apiCall(ApiCalls.LIST_HOSTS, {
        SLD: domain[0],
        TLD: domain[1]
    }).then(({ response, ...result }) => {
        response = response[0].DomainDNSGetHostsResult[0];

        const data = response.host.map((v, i) => {
            v = v['$'];
            return [i + 1, v.HostId, v.Name, v.Type, v.Address, v.TTL];
        });

        const output = [['Index', 'ID', 'Name', 'Type', 'Address', 'TTL']].concat(data);

        console.log(`Looking up record for: ${response['$'].Domain}`);
        console.log(table(output));
    }).catch(e => {
        console.error(e);
    })
}

module.exports = () => {
    return Program
        .command('hosts:list <domain>')
        .description('List this domains hosts.', {
            domain: 'The domain you\'d like to look up.'
        })
        .action(handler);
}
