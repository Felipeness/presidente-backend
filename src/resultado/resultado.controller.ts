import { Controller, Get } from '@nestjs/common';
import { ResultadoService } from './resultado.service';

@Controller('resultado')
export class ResultadoController {
  constructor(private readonly resultadoService: ResultadoService) { }

  @Get()
  async resultado() {
    return this.resultadoService.getResult();
  }
}
