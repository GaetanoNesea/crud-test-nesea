import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersoneDto } from './dto/create-persone.dto';
import { UpdatePersoneDto } from './dto/update-persone.dto';
import { HttpService } from '@nestjs/axios';
import { Persone } from './entities/persone.entity';
import { IPersona } from './models/personeResponse.model';

@Injectable()
export class PersoneService {
  lista: IPersona[] = [];

  constructor(private readonly http: HttpService) {}

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
    if (!persona) {
      throw new NotFoundException();
    }
    return {
      message: 'OK',
      find: 1,
      persona,
    };
  }

  update(id: string, updatePersoneDto: UpdatePersoneDto) {
    let index = null;
    const vuota = !this.lista.length;
    let persona = this.lista.find((item, i) => {
      if (item.id === id) {
        index = i;
        return item;
      }
    });
    if (vuota || !persona) {
      throw new NotFoundException(
        'Nessun elemento nella lista, perché vuota o persona non trovata',
      );
    }
    persona = { ...persona, ...updatePersoneDto };
    this.lista.splice(index, 1, persona);
    return {
      message: 'OK',
      update: 1,
      persona,
    };
  }

  remove(id: string) {
    const persona = this.lista.find((persona) => persona.id === id);
    const vuota = !this.lista.length;
    if (vuota || !persona) {
      throw new NotFoundException(
        'Nessun elemento nella lista, perché vuota o persona non trovata',
      );
    }
    if (!!persona) {
      this.lista = this.lista.filter((persona) => persona.id !== id);
    }
    return {
      message: 'OK',
      remove: 1,
      persona,
    };
  }
}
