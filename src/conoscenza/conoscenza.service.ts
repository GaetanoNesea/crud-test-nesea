import { Injectable } from '@nestjs/common';
import { CreateConoscenzaDto } from './dto/create-conoscenza.dto';
import { UpdateConoscenzaDto } from './dto/update-conoscenza.dto';

@Injectable()
export class ConoscenzaService {
  create(createConoscenzaDto: CreateConoscenzaDto) {
    return 'This action adds a new conoscenza';
  }

  findAll() {
    return `This action returns all conoscenza`;
  }

  findOne(id: number) {
    return `This action returns a #${id} conoscenza`;
  }

  update(id: number, updateConoscenzaDto: UpdateConoscenzaDto) {
    return `This action updates a #${id} conoscenza`;
  }

  remove(id: number) {
    return `This action removes a #${id} conoscenza`;
  }
}
