from pymongo import MongoClient
import os
from dotenv import load_dotenv

load_dotenv()

def get_db():
    client = MongoClient(os.getenv('DB_URL'))
    return client['db1']

def inserir_voto_presidente(obj):
    get_db()['presidente'].insert_one(obj)