const express = require('express');
const {Insert_blogs} = require("../../Redis/insert");
const {Retrive_blogs} = require("../../Redis/retrive")
const DB_retrive = require("../../MongoDB/Retrive");
const producer = require("../../Kafka/Blog_producer");
const multer = require("multer");
const retrive = require("../../Redis/Blog_retrive");
const router = express.Router();


const upload = multer();



router.get('/:number',async(req, res)=>{
    const data =await Retrive_blogs( (req.params.number-1)*10,(req.params.number)*10-1);
    if(data === "Insert Data"){
        const DB = await DB_retrive();
        const Data = DB.map((value)=>{return JSON.stringify(value)});
        await Insert_blogs(Data);
        const req_data = Data.slice(req.params.number-1*10, Math.min((req.params.number+1)*10-1, Data.length))
        console.log(req_data)
        await res.send(req_data)
    }
    else{
        console.log(data)
        res.send(data)
    }
});
router.get('/',async (req, res)=>{
    const data =await Retrive_blogs( 0,9);
    if(data === "Insert Data"){
        const DB = await DB_retrive();
        const Data = DB.map((value)=>{return JSON.stringify(value)});
        await Insert_blogs(Data);
        const req_data = Data.slice(0, Math.min(9, Data.length))
        await res.send(req_data)
    }
    else{
        res.send(data)
    }
})

router.get("/blogs/:number",async(req, res)=>{
    const idx = req.params.number;
    const blog = await retrive(idx)
    res.send(blog)
})

router.post('/',  upload.none(),(req, res)=>{
    const date = new Date();
    const today = `${date.getDate().toString()}/${(date.getMonth()+1).toString()}/${date.getFullYear().toString()}`;
    const time = `${date.getHours().toString()}:${date.getMinutes().toString()}:${date.getSeconds().toString()}`
    const Full_date = today+" "+time;
    const data = JSON.stringify({'_id':`${Full_date} ${req.body.email}`,'Date':date,...req.body})
    Insert_blogs([data])
    producer(data)
    res.send("Done")
})

module.exports = router;