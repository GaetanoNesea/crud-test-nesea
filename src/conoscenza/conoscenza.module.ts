import {Module} from '@nestjs/common';
import {ConoscenzaService} from './conoscenza.service';
import {ConoscenzaController} from './conoscenza.controller';
import {HttpModule} from '@nestjs/axios';

@Module({
  controllers: [ConoscenzaController],
  providers: [ConoscenzaService],
  imports: [HttpModule],
})
export class ConoscenzaModule {}
