let client = require("./client");

let batch = [];

 async function Blog_Producer(obj){
     const producer = client.producer();
     await producer.connect();
     console.log("producer connected successfully")
    await producer.send({
        topic: 'Blogs',
        messages: obj,
    })
    console.log("producer disconnected successfully")
    await producer.disconnect()
}
module.exports = function Batch_insert (obj){
    batch.push({key:"Blog",value:obj})
    if(batch.length=== 12){
        Blog_Producer(batch)
        batch = []
    }
}
setInterval(async()=>{
    if(batch.length > 0 ){
        await Blog_Producer(batch)
        batch = []
    }
}, 10000)