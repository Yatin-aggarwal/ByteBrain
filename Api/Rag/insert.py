from Rag.client import vector_store
from Rag.chunking import insert


def Paper_insert(url):
    docs = insert(url)
    if(docs!= []):
        vector_store.add_documents(docs)
        return True
    return False