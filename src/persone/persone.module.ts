import { Module } from '@nestjs/common';
import { PersoneService } from './persone.service';
import { PersoneController } from './persone.controller';

@Module({
  controllers: [PersoneController],
  providers: [PersoneService]
})
export class PersoneModule {}
