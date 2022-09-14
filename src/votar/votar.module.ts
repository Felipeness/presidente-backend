import { Module } from '@nestjs/common';
import { VotarService } from './votar.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VotarController } from './votar.controller';
import { Presidente, PresidenteSchema } from './schema/presidente.schema';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Presidente.name, schema: PresidenteSchema }]),
    ThrottlerModule.forRoot({
      ttl: 60,
      limit: 1,
    }),
  ],
  controllers: [VotarController],
  providers: [VotarService]
})
export class VotarModule { }
