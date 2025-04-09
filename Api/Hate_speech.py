from transformers import AutoTokenizer, AutoModelForSequenceClassification
import torch
import numpy as np
from huggingface_hub import login
import dotenv 
import os
dotenv.load_dotenv()

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
login(os.getenv("hf_token"))
tokenizer = AutoTokenizer.from_pretrained("IMSyPP/hate_speech_en")
model = AutoModelForSequenceClassification.from_pretrained("IMSyPP/hate_speech_en").to(device)
tokenizer.add_special_tokens({'pad_token': '[PAD]'})

def speech_check(batch):
    token =  tokenizer.batch_encode_plus(batch,truncation=True, padding = True,return_tensors="pt",max_length=512).to(device)
    with torch.no_grad():
        op = model(token['input_ids'])
        return np.argmax(op.logits.to('cpu').detach().numpy(), axis = 1)
