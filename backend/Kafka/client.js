const { Kafka } = require('kafkajs')
const dotenv = require('dotenv');
dotenv.config({path:'.env'});

const kafka = new Kafka({
  clientId: 'Byte_Brain',
  brokers: [`${process.env.IP}:9092`],
});


module.exports =  kafka;

