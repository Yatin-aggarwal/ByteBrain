const client = require('./client');
 async  function Insert_blogs(obj){
     console.log(obj)
     await client.lPush('blog',obj);
     await client.expire('blog', 7200);

}



module.exports = { Insert_blogs}


