from fastapi import FastAPI, HTTPException, Request
from slowapi.errors import RateLimitExceeded
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.util import get_remote_address
from db import inserir_voto_presidente, resultado_votacao
from presidentes import presidentes

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

@app.get('/resultado')
def resultado():
    return resultado_votacao()