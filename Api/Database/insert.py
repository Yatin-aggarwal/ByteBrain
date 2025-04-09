import pymongo
from dotenv import load_dotenv
import os 
load_dotenv()
username = os.getenv("MONGODB_USERNAME")
password = os.getenv("MONGODB_PASSWORD")
url = "mongodb://{}:{}@localhost:27017".format(username, password)
client = pymongo.MongoClient(url)
db = client["Byte_"]
collection = db["Blogs"]

def InsertBlog(batch):
    try:
        print("inserted")
        return collection.insert_many(batch)   
    except:
        return "error in input "

