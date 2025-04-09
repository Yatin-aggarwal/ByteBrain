import chromadb
from langchain_chroma import Chroma
from langchain_ollama import OllamaEmbeddings
client = chromadb.HttpClient(host='localhost', port=1020)


embeddings = OllamaEmbeddings(model="mxbai-embed-large") 
vector_store = Chroma(
    client=client,
    collection_name="Research_paper",
    embedding_function=embeddings,
)