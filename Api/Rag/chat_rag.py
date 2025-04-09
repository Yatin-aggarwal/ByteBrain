from kafka.admin import KafkaAdminClient, NewTopic
from kafka import KafkaProducer
import json
import uuid
client = KafkaAdminClient()
topic = NewTopic(
    name="user_chat",
    num_partitions=1,
    replication_factor=1
)
try:
    client.create_topics(new_topics=[topic], validate_only=False)
    print("Topic created successfully.")
except:
    print("Topic already exist.")
    pass


def add_chat(query, url , response ):
    doc = json.dumps({"query":query, "url":url, "response":response})
    producer = KafkaProducer(
    bootstrap_servers='localhost:9092',
    key_serializer=str.encode,
    value_serializer=str.encode
    )
    unique_id = uuid.uuid4()
    producer.send('user_chat', key=str(unique_id), value=doc)
    producer.flush()
    return
