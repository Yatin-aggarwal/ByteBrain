from langchain_ollama import ChatOllama
from langchain.prompts import ChatPromptTemplate
from Rag.client import vector_store
from langchain.retrievers import ContextualCompressionRetriever
from langchain.retrievers.document_compressors import FlashrankRerank
from flashrank import Ranker 
import os
import dotenv
from huggingface_hub import login
dotenv.load_dotenv()

login(os.getenv("hf_token"))

llm = ChatOllama(
        model="deepseek-llm:latest",
        temperature=0,
    )

def query_structuring(question):
    messages = [
    ("system", "You are an expert in machine learning research and academic writing. Your task is to refine and elaborate on the given research question related to machine learning. Ensure that the question is grammatically correct, well-structured, and clearly articulated for academic and research purposes."),
    ("human", "Refine on the following machine learning research {question}, ensuring grammatical accuracy, structural clarity, and contextual depth."),
    ]
    prompt_template = ChatPromptTemplate.from_messages(messages)
    prompt = prompt_template.invoke({"question": question})
    return llm.invoke(prompt).content



def retrive(query, url ):
    structured_query= query_structuring(query)
    base_retriever = vector_store.as_retriever(search_type='mmr',search_kwargs={"k":4,"filter": {'URL':url}})
    ranker = Ranker(model_name="ms-marco-MiniLM-L-12-v2")
    compressor = FlashrankRerank(model="ms-marco-MiniLM-L-12-v2", top_n=3)
    compressed_retriever = ContextualCompressionRetriever(
    base_compressor=compressor,
    base_retriever=base_retriever
    )
    retrieved_docs = compressed_retriever.invoke(structured_query)
    doc = []
    for content in retrieved_docs:
        doc.append(content.page_content)
    messages = [
            ("system", "You are an expert in interpreting machine learning research papers. Your task is to provide precise, well-structured explanations strictly based on the given context. Ensure your response adheres to academic standards, maintaining clarity and accuracy while avoiding speculation."),
            ("human", "The following question pertains to an ML research paper: {question}"),
            ("human", "Relevant context extracted from the paper: {context}"),
            ("human", "Based solely on the provided context, generate a very detailed, research-backed explanation for the question. Avoid assumptions beyond the given information."),
        ]
    prompt_template = ChatPromptTemplate.from_messages(messages)
    prompt = prompt_template.invoke({"question": structured_query , "context": doc})
    res = llm.invoke(prompt).content
    print(res)
    return  res