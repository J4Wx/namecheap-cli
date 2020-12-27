const Program = require('commander');
const Namecheap = require('../lib/LoadNamecheapWithConfig');
const ApiCalls = require('../lib/ApiCalls');
const { table } = require('table');

const handler = async (domain, name, type, address, TTL) => {
    const NamecheapClient = await Namecheap();
    domain = domain.split('.');

    if (domain.length !== 2) {
        console.log('You must enter a single, base domain. Example: example.com');
        return;
    }

    NamecheapClient.apiCall(ApiCalls.LIST_HOSTS, {
        SLD: domain[0],
        TLD: domain[1]
    }).then(async ({ response, ...result }) => {
        response = response[0].DomainDNSGetHostsResult[0];

        const domains = [];
        const domainData = {};

        if (response.host) {
            response.host.map((v, i) => {
                v = v['$'];
                domains.push(v.Name);
                domainData[v.Name] = [v.Name, v.Type, v.Address, v.TTL];
            });
        }

        if (domains.indexOf(name) === -1) {
            domains.push(name);
        }

        domainData[name] = [name, type, address, TTL];

        const payload = {
            SLD: domain[0],
            TLD: domain[1],
            EmailType: response['$'].EmailType
        }

        let iteration = 0;
        for (let i in domains) {
            iteration += 1;
            payload[`HostName${iteration}`] = domainData[domains[i]][0];
            payload[`RecordType${iteration}`] = domainData[domains[i]][1];
            payload[`Address${iteration}`] = domainData[domains[i]][2];
            payload[`TTL${iteration}`] = domainData[domains[i]][3];
        }

        NamecheapClient.apiCall(ApiCalls.SET_HOST, payload).then(({ response, ...result }) => {
            console.log(`Updated Hosts for ${name}.`);
        }).catch(e => {
            console.error(e);
        });
    }).catch(e => {
        console.error(e);
    })

}

module.exports = () => {
    return Program
        .command('hosts:set <domain> <name> <type> <address> [TTL]')
        .description('Update or create a host entry.', {
            domain: 'The domain you\'d like to update.',
            name: 'The subdomain you\'d like to update.',
            type: 'The type of entry you\'d like to use. [A,AAAA,ALIAS,CAA,CNAME,MX,MXE,NS,TXT,URL,URL301,FRAME]',
            address: 'The address you\'d like this entry to point to.',
            TTL: 'The chosen TTL. Defaults to 1800.'
        })
        .action(handler);
}
