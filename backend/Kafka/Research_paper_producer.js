let client = require("./client");
const {uid} = require('uid')
async function Insert_url(url, email){
    const date = new Date();
    const today = `${date.getDate().toString()}/${(date.getMonth()+1).toString()}/${date.getFullYear().toString()}`;
    const time = `${date.getHours().toString()}:${date.getMinutes().toString()}`
    const Full_date = today+" "+time;
    const producer = client.producer();
    const key = uid(32)
    await producer.connect();
    await producer.send({
        topic: 'Papers',
        messages:[{key:key,  value : JSON.stringify({ date: Full_date, url: url, email: email })}],
    })
    await producer.disconnect();
    return "done"
}
module.exports = Insert_url