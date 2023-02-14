import {BadRequestException, HttpException, HttpStatus, Injectable, NotFoundException} from '@nestjs/common';
import {CreatePersoneDto} from './dto/create-persone.dto';
import {UpdatePersoneDto} from './dto/update-persone.dto';
import {HttpService} from "@nestjs/axios";
import {Persone} from "./entities/persone.entity";
import {IPersona} from "./models/personeResponse.model";


@Injectable()
export class PersoneService {
    lista: IPersona[] = [];

    constructor(
        private readonly http: HttpService
    ) {
    }

    async create({name, username, email}: CreatePersoneDto) {
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
                        next: ({data}) => {
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
            : new NotFoundException();
    }

    update(id: string, updatePersoneDto: UpdatePersoneDto) {
        let persona = this.lista.find((persona, index) => {
            if (persona.id === id) {
                this.lista.splice(index, 1, {...persona, ...updatePersoneDto})
                return {...persona, ...updatePersoneDto}
            } else {
                throw new BadRequestException()
            }
        });
        return {
            message: 'OK',
            update: 1,
            persona
        };
    }

    remove(id: string) {

        const persona = this.lista.find((persona) => persona.id === id);
        if (!persona) {
            throw new BadRequestException()
        }
        this.lista = this.lista.filter((persona) => persona.id !== id);
        return {
            message: 'OK',
            remove: 1,
            persona
        };


    }
}
