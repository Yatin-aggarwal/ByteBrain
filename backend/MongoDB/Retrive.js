const mongoose = require('mongoose');
const {Schema} = mongoose;
const {URL,clientOptions } = require('./client')

const schema = new Schema({
        "_id":String,
        "Email":String,
        "Username":String,
        "Heading":String,
        "Subheading":String,
        "Content":String,
        "Date":String,
    },
    {collection:'Blogs'})

module.exports = async function retrive(){
    await mongoose.connect(URL, clientOptions);
    const Blogs = mongoose.model('Blogs', schema);
    const res = await Blogs.find();
    await mongoose.disconnect()
    return res;

}



