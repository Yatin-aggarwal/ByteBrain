const express = require('express');
const multer = require("multer");
const producer = require('../../Kafka/Research_paper_producer');
const check = require("../../Redis/paper_check");
const router = express.Router();
const retrive = require("../../Redis/paper_retrive");


const upload = multer();
router.post('/',  upload.none(),async (req,res)=>{
    const body = req.body;
    const response = await check(body.url);
    if(response === 'True'){
        res.send("Requested paper is already present")
    }
    else {
        await producer(body.url, body.email);
    res.send("Paper is currently in process. You will be notified once available.")
    }

})

router.get(('/'),async (req,res)=>{
        let data = [];
        const response = await  retrive();
        data = [...response];
        res.send(data)
})

module.exports = router;