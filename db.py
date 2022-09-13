from pymongo import MongoClient
import os
from dotenv import load_dotenv
from presidentes import presidentes

load_dotenv()

def get_db():
    client = MongoClient(os.getenv('DB_URL'))
    return client['db1']

def inserir_voto_presidente(obj):
    get_db()['presidente'].insert_one(obj)

def resultado_votacao():
    collection = get_db()['presidente']
    resultado = {}

    for i in presidentes:
        resultado[presidentes[i]["nome"]] = collection.count_documents({"numero": i})
    
    resultado["BRANCO"] = collection.count_documents({"numero": "BRANCO"})
    resultado["NULO"] = collection.count_documents({"numero": "NULO"})
    
    return resultado