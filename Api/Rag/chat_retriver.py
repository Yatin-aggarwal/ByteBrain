import chromadb
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
client = chromadb.HttpClient(host='localhost', port=1020)


embeddings = OllamaEmbeddings(model="mxbai-embed-large") 
vector_store = Chroma(
    client=client,
    collection_name="Ai_chats",
    embedding_function=embeddings,
)

def chat_retrive(query, url):
    retriver = vector_store.as_retriever(search_type="similarity_score_threshold",
        search_kwargs={'score_threshold': 0.7,"filter": {"url": url}})
    res = retriver.invoke(query)
    return res
