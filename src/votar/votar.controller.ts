import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ThrottlerGuard } from '@nestjs/throttler';
import { VotarService } from './votar.service';

@UseGuards(ThrottlerGuard)
@Controller('votar/presidente')
export class VotarController {
  constructor(private readonly votarService: VotarService) {}

  @Get("branco")
  async votoBranco(){
    await this.votarService.votarBranco()
    return {"message": "success"}
  }

  @Get("nulo")
  async votoNulo(){
    await this.votarService.votarNulo();
    return {"message": "success"}
  }

  @Get(":numero")
  async votoNormal(@Param('numero') numero: string) {
    await this.votarService.votarPresidente(numero);
    return {"message": "success"}
  }
}
