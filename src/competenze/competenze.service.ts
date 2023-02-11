import { Injectable } from '@nestjs/common';
import { CreateCompetenzeDto } from './dto/create-competenze.dto';
import { UpdateCompetenzeDto } from './dto/update-competenze.dto';

@Injectable()
export class CompetenzeService {
  create(createCompetenzeDto: CreateCompetenzeDto) {
    return 'This action adds a new competenze';
  }

  findAll() {
    return `This action returns all competenze`;
  }

  findOne(id: number) {
    return `This action returns a #${id} competenze`;
  }

  update(id: number, updateCompetenzeDto: UpdateCompetenzeDto) {
    return `This action updates a #${id} competenze`;
  }

  remove(id: number) {
    return `This action removes a #${id} competenze`;
  }
}
