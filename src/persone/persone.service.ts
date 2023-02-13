import { Injectable } from '@nestjs/common';
import { CreatePersoneDto } from './dto/create-persone.dto';
import { UpdatePersoneDto } from './dto/update-persone.dto';
import {ajax} from "rxjs/internal/ajax/ajax";
import {HttpService} from "@nestjs/axios";

@Injectable()
export class PersoneService {
  lista: CreatePersoneDto[] = [];

  constructor(
      private readonly http: HttpService
  ) {
  }
  create(createPersoneDto: CreatePersoneDto) {
    return 'This action adds a new persone';
  }

  async findAll() {
    return await new Promise((resolve, reject) => {
      if (!this.lista.length) {
        this.http.get('https://jsonplaceholder.typicode.com/users').subscribe({
          next: ({ data }) => {
            this.lista = data;
            resolve(data);
          },
          error: (err) => reject(err),
          complete: () => console.info('Promise complete'),
        });
      } else {
        resolve(this.lista);
      }
    });
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
