const client = require("./client");

async function Retrive_blogs(left , right){

     const n = await client.lLen('blog')
     if(n === 0 ){
         return "Insert Data";
     }
     if( left > n){
         return "No result found"
     }
     const result = await client.lRange('blog', left, Math.min(right,n));

    return result;

}

module.exports = {Retrive_blogs}