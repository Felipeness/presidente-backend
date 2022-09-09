from fastapi import FastAPI, HTTPException, Request
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from db import inserir_voto_presidente


presidentes = {
    "13": {
        "numero": "13",
        "nome": "LULA",
        "partido": "PT",
    },
    "22": {
        "numero": "22",
        "nome": "JAIR BOLSONARO",
        "partido": "PL",
    },
    "12": {
        "numero":"12",
        "nome": "CIRO GOMES",
        "partido": "PDT",
    },
    "15": {
        "numero":"15",
        "nome": "SIMONE TEBET",
        "partido": "MDP",
    },
    "30": {
        "numero":"30",
        "nome": "LUIZ FELIPE d'Avila",
        "partido": "NOVO",
    },
    "44": {
        "numero":"44",
        "nome": "SORAYA THRONICKE",
        "partido": "UNIÃO",
    },
}

limiter = Limiter(key_func=get_remote_address)
app = FastAPI()
app.state_limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

@app.get("/votar/presidente/branco")
@limiter.limit("1/minute")
def presidente_branco(request: Request):
    inserir_voto_presidente({"numero": "BRANCO"})
    return {"message": "success"}


@app.get("/votar/presidente/nulo")
@limiter.limit("1/minute")
def presidente_nulo(request: Request):
    inserir_voto_presidente({"numero": "NULO"})
    return {"message": "success"}


@app.get("/votar/presidente/{numero}")
@limiter.limit("1/minute")
def presidente(numero: str, request: Request):
    if numero in presidentes:
        inserir_voto_presidente(presidentes[numero])
        return {"message": "success"}
    else: 
        raise HTTPException(status_code=404, detail="Número invalido")
