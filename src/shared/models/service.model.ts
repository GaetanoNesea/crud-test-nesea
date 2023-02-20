import {HttpService} from '@nestjs/axios';
import {Persone} from '../../persone/entities/persone.entity';
import {IPersona} from '../../persone/models/personeResponse.model';
import {NotFoundException} from '@nestjs/common';
import {ProvaModel} from './prova.model';
import {v4 as uuidv4} from 'uuid';

export class ServiceModelClass<T extends ProvaModel, K, G> {
  lista: T[] = [];
  classe: new (...arg) => T;
  element: T;

  constructor(readonly http: HttpService) {}

  async create(obj: K, find: boolean = false) {
    if (!this.lista.length && !!find) {
      await this.findAll();
    }
    return this.createFunction(obj);
  }

  createFunction<T extends IPersona>(obj: K) {
    const persona = new this.classe(obj);
    this.lista.push(persona);
    return persona;
  }

  private createClass() {
    return new this.classe();
  }

  createListWithUUID(data: T[]): T[] {
    return data.map((item) => ({...item, id: uuidv4()}));
  }

  async findAll(find: boolean = false): Promise<T[]> {
    try {
      return await new Promise((resolve, reject) => {
        if (!this.lista.length && !!find) {
          this.http
            .get<T[]>('https://jsonplaceholder.typicode.com/users')
            .subscribe({
              next: ({data}) => {
                this.lista = this.createListWithUUID(data);
                resolve(this.lista);
              },
              error: (err) => reject(err),
              complete: () => console.info('Promise complete'),
            });
        } else {
          resolve(this.lista);
        }
      });
    } catch (err) {
      console.error(err, 'error');
    }
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

  update(id: string, updatePersoneDto: G) {
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
    persona = {...persona, ...updatePersoneDto};
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
