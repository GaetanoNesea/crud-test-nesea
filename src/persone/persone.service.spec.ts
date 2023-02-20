import {Test, TestingModule} from '@nestjs/testing';
import {PersoneService} from './persone.service';
import {HttpModule} from '@nestjs/axios';
import {IPersona} from './models/personeResponse.model';
import {Observable} from 'rxjs';
import {AxiosResponse} from 'axios';
import {NotFoundException} from '@nestjs/common';

describe('PersoneService', () => {
  let service: PersoneService;
  let apiEsterna: jest.SpyInstance<
    Observable<AxiosResponse<IPersona[], any>>,
    []
  >;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersoneService],
      imports: [HttpModule],
    }).compile();

    service = module.get<PersoneService>(PersoneService);
    apiEsterna = jest.spyOn(service, 'getPersonaAPI');
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should lista persone vuota', function () {
    expect(service.lista.length).toBe(0);
  });
  it('should lista vuota chiama api esterna e poi crea uuid nella lista', async () => {
    //const spy = jest.spyOn(service, 'getPersonaAPI');
    expect(service.lista.length).toBe(0);
    await service.findAll();
    expect(apiEsterna).toBeCalledTimes(1);
    expect(service.lista).not.toHaveLength(0);
  });
  it('should con lista piena non chiama api esterna e nemmeno la funzione per uuid', async () => {
    service.lista = [
      {
        id: '1',
        email: 'g.sabino@nesea.it',
        username: 'sabino',
        address: {
          zipcode: '',
          geo: {
            lng: '',
            lat: '',
          },
          suite: '',
          street: '',
          city: 'Torino',
        },
        company: {name: 'Nesea', bs: '', catchPhrase: ''},
        name: 'Gaetano',
        phone: null,
        website: null,
      },
    ];
    await service.findAll();
    expect(apiEsterna).toBeCalledTimes(0);
    expect(service.lista).toHaveLength(1);
  });
  it('should errore ricerca', function () {
    expect(() => service.findOne('')).toThrow(NotFoundException);
  });
  it('should findOne', async () => {
    // let res = service.findOne('');
    await service.findAll();
    const id = service.lista.at(1).id;
    const res = service.findOne(id);
    expect(res).toEqual({
      find: 1,
      message: 'OK',
      persona: service.lista.at(1),
    });
  });

  it('should remove persona con lista vuota NotfoundException', function () {
    expect(() => service.remove('')).toThrow(NotFoundException);
  });

  it('should remove persona con id sbagliato', async () => {
    // let res = service.findOne('');
    await service.findAll();
    const numeroPersone = service.lista.length;
    const id = service.lista.at(1).id;
    expect(() => service.remove(id + 1)).toThrow(NotFoundException);
    const res = service.remove(id);
    expect(service.lista).not.toContain(res.persona);
    expect(numeroPersone).toEqual(service.lista.length + 1);
  });
});
