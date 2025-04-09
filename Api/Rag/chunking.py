from unstructured.partition.pdf import partition_pdf
import requests
from io import BytesIO
from langchain_core.documents import Document
from bs4 import BeautifulSoup
import pandas as pd
import ollama
import dotenv
from huggingface_hub import login
import os
dotenv.load_dotenv()

login(os.getenv("hf_token"))

def content_extraction(url):
    if("https://arxiv.org/pdf/"== url[:22]):
        response = requests.get(url)
        response.raise_for_status()
        if response.status_code == 200:
            pdf_stream = BytesIO(response.content)
            raw_pdf_elements = partition_pdf(
                file=pdf_stream,
                infer_table_structure=True,
                chunking_strategy="by_title",
                max_characters=4000,
                multipage_sections = True,
                new_after_n_chars=3800,
                combine_text_under_n_chars=2000 )
            return raw_pdf_elements
    return []

def table_extraction(raw_table):
    try:
        soup = BeautifulSoup(raw_table, "html.parser")
        table = soup.find("table")
        headers = [th.text.strip() for th in table.find_all("th")]
        data = []
        for row in table.find_all("tr")[1:]:  # Skip header row
            cols = row.find_all("td")
            data.append([col.text.strip() for col in cols])
        df = pd.DataFrame(data, columns=headers)
        table_json = df.to_json(orient='records')
        response = ollama.chat(
        model='llama3-chatqa:8b',
        messages=[
                {"role": "system", "content": "You are an AI expart in reading and understanding tables. "},
                {"role": "user", "content": f"Here is a table: {table_json}. Can you summarize the key insights of the given ML research table? Also specify learnings frm research paper table. Also give brief conclusion note for this table. All resonse and explanation must be in string data structure. "}
            ]
        )
        return response['message']['content']
    except:
        return ""
    

def insert(URL):
    document = []
    chunks = content_extraction(URL)
    for docs in chunks:
        content = str(docs)
        meta_data = docs.metadata.to_dict()
        try:
            del meta_data['languages']
        except:
            pass
        meta_data['URL']=URL
        doc = Document(
                page_content=content,
                metadata=meta_data
            )
        document.append(doc)
        if('text_as_html' in meta_data.keys()):
            table = table_extraction(meta_data['text_as_html'])
            if(table ==""):
                continue
            doc =  Document(
                page_content=table,
                metadata=meta_data
            )
            document.append(doc)
    return document
