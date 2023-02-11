import { Module } from '@nestjs/common';
import { CompetenzeService } from './competenze.service';
import { CompetenzeController } from './competenze.controller';

@Module({
  controllers: [CompetenzeController],
  providers: [CompetenzeService]
})
export class CompetenzeModule {}
