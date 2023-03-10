import {HttpService} from '@nestjs/axios';
import {IPersona} from '../../persone/models/personeResponse.model';
import {NotFoundException} from '@nestjs/common';
import {ProvaModel} from './prova.model';
import {v4 as uuidv4} from 'uuid';

export interface UpDate<T> extends Partial<Record<Type, T>> {
  message: string;
  update?: number;
  find?: number;
}

export type Type = 'persona' | 'conoscenza' | 'competenze';

export class ServiceModelClass<T extends ProvaModel, K, G> {
  lista: T[] = [];
  classe: new (...arg) => T;
  element: T;
  find = false;
  type: Type = 'persona';

  constructor(readonly http: HttpService) {}

  async create(obj: K) {
    if (!this.lista.length && !!this.find) {
      await this.findAll();
    }
    return this.createFunction(obj);
  }

  createFunction(obj: K) {
    const persona = new this.classe(obj);
    this.lista.push(persona);
    return persona;
  }

  createListWithUUID(data: T[]): T[] {
    return data.map((item) => ({...item, id: uuidv4()}));
  }

  getPersonaAPI() {
    return this.http.get<T[]>('https://jsonplaceholder.typicode.com/users');
  }

  async findAll(): Promise<T[]> {
    try {
      return await new Promise((resolve, reject) => {
        if (!this.lista.length && !!this.find) {
          this.getPersonaAPI().subscribe({
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

  findOne(id: string): UpDate<T> {
    const persona = this.lista.find((persona) => persona.id === id);
    if (!persona) {
      throw new NotFoundException();
    }
    return {
      message: 'OK',
      find: 1,
      [!this.type ? 'persona' : this.type]: persona,
    };
  }

  update(id: string, updatePersoneDto: G): UpDate<T> {
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
        'Nessun elemento nella lista, perch?? vuota o persona non trovata',
      );
    }
    persona = {...persona, ...updatePersoneDto};
    this.lista.splice(index, 1, persona);
    return {
      message: 'Ok',
      update: 1,
      [this.type]: persona,
    };
  }

  remove(id: string) {
    const persona = this.lista.find((persona) => persona.id === id);
    const vuota = !this.lista.length;
    if (vuota || !persona) {
      throw new NotFoundException(
        'Nessun elemento nella lista, perch?? vuota o persona non trovata',
      );
    }
    if (!!persona) {
      this.lista = this.lista.filter((persona) => persona.id !== id);
    }
    return {
      message: 'OK',
      remove: 1,
      [!this.type ? 'persona' : this.type]: persona,
    };
  }
}
