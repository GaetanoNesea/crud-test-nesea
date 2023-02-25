import { Module } from '@nestjs/common';
import { CompetenzeService } from './competenze.service';
import { CompetenzeController } from './competenze.controller';
import {HttpModule} from '@nestjs/axios';

@Module({
  controllers: [CompetenzeController],
  providers: [CompetenzeService],
  imports: [HttpModule]
})
export class CompetenzeModule {}
