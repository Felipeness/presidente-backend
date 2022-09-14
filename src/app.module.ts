import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VotarModule } from './votar/votar.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.DB_URL + "/db1?retryWrites=true&w=majority"),
    VotarModule, 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
