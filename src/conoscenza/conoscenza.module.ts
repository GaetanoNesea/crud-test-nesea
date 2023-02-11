import { Module } from '@nestjs/common';
import { ConoscenzaService } from './conoscenza.service';
import { ConoscenzaController } from './conoscenza.controller';

@Module({
  controllers: [ConoscenzaController],
  providers: [ConoscenzaService]
})
export class ConoscenzaModule {}
