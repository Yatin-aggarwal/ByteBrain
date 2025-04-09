const client = require('./client')
async function check(url){
    const response =  await client.hGet('paper',url);
    return response;
}

module.exports = check;