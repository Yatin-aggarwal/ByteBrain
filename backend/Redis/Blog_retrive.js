const client = require("./client");
const DB_retrive = require("../MongoDB/Retrive");
const {Insert_blogs} = require("./insert");

async function retrive_blogs(idx){
     const n = await client.lLen('blog');
     if(n === 0 ){
          const DB = await DB_retrive();
          const Data = DB.map((value)=>{return JSON.stringify(value)});
          await Insert_blogs(Data);
     }
     console.log(idx)

     const blog = await client.lIndex("blog",idx);
     return blog

}
module.exports= retrive_blogs;
