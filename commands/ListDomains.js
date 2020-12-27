const Program = require('commander');
const Namecheap = require('../lib/LoadNamecheapWithConfig');
const ApiCalls = require('../lib/ApiCalls');
const { table } = require('table');

const handler = async (page = 1) => {
    const NamecheapClient = await Namecheap();

    NamecheapClient.apiCall(ApiCalls.LIST_DOMAINS, {page}).then(({ response, ...result }) => {
        var data = response[0].DomainGetListResult[0].Domain;
        const paging = response[0].Paging[0];

        data = data.map((v, i) => {
            const row = v['$'];

            return [
                i + 1, row.ID, row.Name    
            ];
        });

        const output = [['index', 'id', 'name']].concat(data);

        console.log(table(output));
        console.log(`Page: ${paging.CurrentPage} of ${Math.ceil(paging.TotalItems/paging.PageSize)}`);
    }).catch(e => {
        console.error(e);
    })
}

module.exports = () => {
    return Program
        .command('domains:list [page]')
        .description('List this users domains.')
        .action(handler);
}
