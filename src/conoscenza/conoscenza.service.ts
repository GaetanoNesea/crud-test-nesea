import {Injectable} from '@nestjs/common';
import {CreateConoscenzaDto} from './dto/create-conoscenza.dto';
import {UpdateConoscenzaDto} from './dto/update-conoscenza.dto';
import {ServiceModelClass} from '../shared/models/service.model';
import {ConoscenzaModel} from './models/conoscenza.model';
import {HttpService} from '@nestjs/axios';
import {Conoscenza} from './entities/conoscenza.entity';

@Injectable()
export class ConoscenzaService extends ServiceModelClass<
  ConoscenzaModel,
  CreateConoscenzaDto,
  UpdateConoscenzaDto
> {
  constructor(readonly http: HttpService) {
    super(http);
    this.classe = Conoscenza;
    this.element = new Conoscenza('', '');
  }
}
