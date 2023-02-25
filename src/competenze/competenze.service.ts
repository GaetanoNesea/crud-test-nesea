import {Injectable} from '@nestjs/common';
import {CreateCompetenzeDto} from './dto/create-competenze.dto';
import {UpdateCompetenzeDto} from './dto/update-competenze.dto';
import {ServiceModelClass} from '../shared/models/service.model';
import {CompetenzeModel} from './model/competenze.model';
import {HttpService} from '@nestjs/axios';
import {Competenze} from './entities/competenze.entity';

@Injectable()
export class CompetenzeService extends ServiceModelClass<
  CompetenzeModel,
  CreateCompetenzeDto,
  UpdateCompetenzeDto
> {

  constructor(readonly http: HttpService) {
    super(http);
    this.classe = Competenze;
    this.type = 'competenze';
  }
}


