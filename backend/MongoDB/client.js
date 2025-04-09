
const dotenv = require('dotenv');
dotenv.config({path:'.env'});

const username = process.env.MONGO_USER
const password = process.env.MONGO_PASSWORD



const URL = `mongodb://${username}:${password}@localhost:27017/Byte_?authSource=admin`;
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

module.exports = {URL,clientOptions}
