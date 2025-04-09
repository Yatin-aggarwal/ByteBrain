const client = require('./client');
async function papers_retrive () {
    const data = await client.lRange('list_paper',0,-1)
    return data
}

module.exports = papers_retrive
