from kafka import KafkaConsumer
consumer = KafkaConsumer(
    auto_offset_reset='latest', 
    enable_auto_commit=True
)
