import { Module } from '@nestjs/common';
import { ResultadoService } from './resultado.service';
import { ResultadoController } from './resultado.controller';
import { Presidente, PresidenteSchema } from '../votar/schema/presidente.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Presidente.name, schema: PresidenteSchema }])
  ],
  controllers: [ResultadoController],
  providers: [ResultadoService]
})
export class ResultadoModule {}
