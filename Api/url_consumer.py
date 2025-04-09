from Kafka.client import consumer
import json
from Rag.insert import Paper_insert
from Redis.client import Redis_client
from SMTP import Email

print("url_consumer connected")

consumer.subscribe(topics=['Papers'])
while True:
    msg = consumer.poll(timeout_ms=1000)
    if(msg == {}):
        continue
    for batch in msg.values():
            for messages in batch:
                data = json.loads(messages.value)
                if(bool(Redis_client.hget("paper",data['url']))):
                     Email(data['email'])
                res = Paper_insert(data['url'])
                if(res == 1):
                    Redis_client.hset("paper",data['url'] ,'True')
                    Redis_client.lpush("list_paper",messages.value)
                    Email(data['email'])


  