import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Presidente, PresidenteDocument } from './schema/presidente.schema';
import { presidentes } from './presidentes';

@Injectable()
export class VotarService {
    constructor(@InjectModel(Presidente.name) private presidenteModel: Model<PresidenteDocument>) { }

    async votarBranco() {
        await this.presidenteModel.create({"numero": "BRANCO"})
    }

    async votarNulo() {
        await this.presidenteModel.create({"numero": "NULO"})
    }

    async votarPresidente(numero: string) {
        if (numero in presidentes) {
            await this.presidenteModel.create(presidentes[numero])
        } else {
            throw new NotFoundException();
        }
    }
}
