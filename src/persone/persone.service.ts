import { Injectable } from '@nestjs/common';
import { CreatePersoneDto } from './dto/create-persone.dto';
import { UpdatePersoneDto } from './dto/update-persone.dto';

@Injectable()
export class PersoneService {
  create(createPersoneDto: CreatePersoneDto) {
    return 'This action adds a new persone';
  }

  findAll() {
    return `This action returns all persone`;
  }

  findOne(id: number) {
    return `This action returns a #${id} persone`;
  }

  update(id: number, updatePersoneDto: UpdatePersoneDto) {
    return `This action updates a #${id} persone`;
  }

  remove(id: number) {
    return `This action removes a #${id} persone`;
  }
}
