import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CompetenzeModule } from './competenze/competenze.module';
import { ConoscenzaModule } from './conoscenza/conoscenza.module';
import { PersoneModule } from './persone/persone.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    HttpModule,
    CompetenzeModule,
    PersoneModule,
    ConoscenzaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
