from kafka import KafkaConsumer
import chromadb
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
from langchain_ollama import ChatOllama
from langchain.prompts import ChatPromptTemplate
from langchain_core.documents import Document
import json
client = chromadb.HttpClient(host='localhost', port=1020)
print("chat consumer connected")


embeddings = OllamaEmbeddings(model="mxbai-embed-large") 
vector_store = Chroma(
    client=client,
    collection_name="Ai_chats",
    embedding_function=embeddings,
)
consumer = KafkaConsumer(
    auto_offset_reset='latest', 
    enable_auto_commit=True
)
llm = ChatOllama(model = "llava:latest", temperature= 0)
def generate_query(query, url, response):
    question = "Create same question in 3 different forms. {question}"
    ques = question.format(question = query)
    result = llm.invoke(ques).content.split('\n')
    questions = [*result, query]
    docs = []
    for i in questions:
        document = Document(
        page_content=i,
        metadata={"url": url, "response":response }
        )
        docs.append(document)
    return docs


consumer.subscribe(topics=['user_chat'])

while True:
    msg = consumer.poll(timeout_ms=1000)
    if(msg == {}):
        continue
    for item in msg.values():
        batch = []
        req = []
        for messages in item:
            res = json.loads(messages.value)
            docs = generate_query(res['query'], res['url'], res['response'])
            vector_store.add_documents(docs)
            print(res['query'], " is successfully inserted " )