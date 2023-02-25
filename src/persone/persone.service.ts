import {Injectable} from '@nestjs/common';
import {CreatePersoneDto} from './dto/create-persone.dto';
import {UpdatePersoneDto} from './dto/update-persone.dto';
import {HttpService} from '@nestjs/axios';
import {IPersona} from './models/personeResponse.model';
import {ServiceModelClass} from '../shared/models/service.model';
import {Persone} from './entities/persone.entity';

@Injectable()
export class PersoneService extends ServiceModelClass<
  IPersona,
  CreatePersoneDto,
  UpdatePersoneDto
> {
  constructor(readonly http: HttpService) {
    super(http);
    this.find = true;
    this.classe = Persone;
  }
}
