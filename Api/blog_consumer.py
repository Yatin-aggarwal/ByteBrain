from Kafka.client import consumer
import json
from Database.insert import InsertBlog
from Hate_speech import speech_check

print("blog consumer connected")
consumer.subscribe(topics=['Blogs'])
while True:
    msg = consumer.poll(timeout_ms=1000)
    if(msg == {}):
        continue
    for item in msg.values():
        batch = []
        req = []
        for messages in item:
            data = json.loads(messages.value)    
            batch.append(data['content'])
            req.append(data)
        accepted = []
        speech_result = speech_check(batch)
        for i in range(len(batch)):
            if speech_result[i] == 0:
                accepted.append(req[i])
        InsertBlog(accepted)