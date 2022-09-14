import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Presidente, PresidenteDocument } from '../votar/schema/presidente.schema';
import { presidentes } from '../votar/presidentes';
import { Model } from 'mongoose';

@Injectable()
export class ResultadoService {
    constructor(@InjectModel(Presidente.name) private presidenteModel: Model<PresidenteDocument>) { }

    async getResult() {
        let resultado = {}
        for (let i in presidentes) {
            resultado[presidentes[i]["nome"]] = await this.presidenteModel.countDocuments({'numero': i})
        }

        resultado["BRANCO"] = await this.presidenteModel.countDocuments({'numero': "BRANCO"})
        resultado["NULO"] = await this.presidenteModel.countDocuments({'numero': "NULO"})

        return resultado;
    }
}
