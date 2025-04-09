const  kafka = require('./client')
async function init(){
    try{
        const admin = kafka.admin();
    await admin.connect()
    console.log("Admin connected successfully");
    await admin.createTopics({
        topics:[
            {
                topic:"Papers",
                numPartitions:1,
                 replicationFactor: 1,
            },
            {
                topic:"Blogs",
                numPartitions:1,
                replicationFactor: 1,
            }
        ]
    })
    await admin.disconnect();
    console.log("Admin disconnected successfully");
    }
    catch(err){
        console.log("topics exist")
    }
    
}


module.exports = {init};