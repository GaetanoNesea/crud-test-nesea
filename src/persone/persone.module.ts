import { Module } from '@nestjs/common';
import { PersoneService } from './persone.service';
import { PersoneController } from './persone.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  controllers: [PersoneController],
  providers: [PersoneService],
  imports: [HttpModule],
  exports: [],
})
export class PersoneModule {}
