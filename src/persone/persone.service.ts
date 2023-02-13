import { Injectable } from '@nestjs/common';
import { CreatePersoneDto } from './dto/create-persone.dto';
import { UpdatePersoneDto } from './dto/update-persone.dto';
import { HttpService } from "@nestjs/axios";
import {Persone} from "./entities/persone.entity";
import {IPersona} from "./models/personeResponse.model";
import {NotFoundError} from "rxjs";


@Injectable()
export class PersoneService {
  lista: IPersona[] = [];

  constructor(
      private readonly http: HttpService
  ) {
  }
  async create({ name, username, email }: CreatePersoneDto) {
    if (!this.lista.length) {
      await this.findAll();
    }
    const persona = new Persone(name, username, email);
    this.lista.push(persona);
    return persona;
  }

  async findAll() {
    return await new Promise((resolve, reject) => {
      if (!this.lista.length) {
        this.http
          .get<IPersona[]>('https://jsonplaceholder.typicode.com/users')
          .subscribe({
            next: ({ data }) => {
              this.lista = Persone.createId(data);
              resolve(this.lista);
            },
            error: (err) => reject(err),
            complete: () => console.info('Promise complete'),
          });
      } else {
        resolve(this.lista);
      }
    });
  }

  findOne(id: string) {
    const persona = this.lista.find((persona) => persona.id === id);
    return !!persona
      ? {
          message: 'OK',
          find: 1,
          persona,
        }
      : new NotFoundError('Nessuna Persona trovata');
  }

  update(id: number, updatePersoneDto: UpdatePersoneDto) {
    return `This action updates a #${id} persone`;
  }

  remove(id: string) {
    const persona = this.lista.find((persona) => persona.id === id);
    if (!!persona) {
      this.lista = this.lista.filter((persona) => persona.id !== id);
    }
    return !!persona
      ? {
          message: 'OK',
          remove: 1,
          persona,
        }
      : new NotFoundError('Nessuna Persona trovata');
  }
}
