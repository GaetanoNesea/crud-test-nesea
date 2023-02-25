import {Test, TestingModule} from '@nestjs/testing';
import {CompetenzeService} from './competenze.service';
import {HttpModule} from '@nestjs/axios';
import {Observable} from 'rxjs';
import {AxiosResponse} from 'axios';
import {CompetenzeModule} from './competenze.module';
import {UpdateCompetenzeDto} from './dto/update-competenze.dto';
import {NotFoundException} from '@nestjs/common';

describe('CompetenzeService', () => {
  let service: CompetenzeService;
  let apiEsterna: jest.SpyInstance<
    Observable<AxiosResponse<CompetenzeModule[], any>>,
    []
  >;
  let createUUID: jest.SpyInstance<
    CompetenzeModule[],
    [data: CompetenzeModule[]]
  >;
  let conpetenzeSet: UpdateCompetenzeDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetenzeService],
      imports: [HttpModule],
    }).compile();

    service = module.get<CompetenzeService>(CompetenzeService);
    apiEsterna = jest.spyOn(service, 'getPersonaAPI');
    createUUID = jest.spyOn(service, 'createListWithUUID');
    conpetenzeSet = {
      id: '1',
      nome: 'prova',
      obsoleta: false,
      descrizione: 'descrizione',
      tipologia: 'ambito',
      versione: 'V1',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should lista conoscenza vuota', function () {
    expect(service.lista.length).toBe(0);
  });
  it('should lista vuota non chiama api esterna e lista rimane vuota', async () => {
    //const spy = jest.spyOn(service, 'getPersonaAPI');
    expect(service.lista.length).toBe(0);
    await service.findAll();
    expect(apiEsterna).not.toBeCalled();
    expect(createUUID).not.toBeCalled();
    expect(service.lista).toHaveLength(0);
  });
  it('should con lista piena non chiama api esterna e nemmeno la funzione per uuid', async () => {
    service.lista = [
      {
        id: '1',
        nome: 'prova',
        obsoleta: false,
        descrizione: 'descrizione',
        tipologia: 'ambito',
        versione: 'V1',
      },
    ];
    await service.findAll();
    expect(apiEsterna).toBeCalledTimes(0);
    expect(createUUID).toBeCalledTimes(0);
    expect(service.lista).toHaveLength(1);
  });
  it('should errore ricerca conoscenza', function () {
    expect(() => service.findOne('')).toThrow(NotFoundException);
  });
  it('should findOne', async () => {
    // let res = service.findOne('');
    service.lista = [
      {
        id: '1',
        nome: 'prova',
        obsoleta: false,
        descrizione: 'descrizione',
        tipologia: 'ambito',
        versione: 'V1',
      },
    ];
    // await service.findAll();
    const id = service.lista.at(0).id;
    const res = service.findOne(id);
    expect(res).toEqual({
      find: 1,
      message: 'OK',
      competenze: service.lista.at(0),
    });
  });
  it('should remove conoscenza con lista vuota NotfoundException', function () {
    expect(() => service.remove('')).toThrow(NotFoundException);
  });
  it('should remove persona con id sbagliato', async () => {
    // let res = service.findOne('');
    service.lista = [
      {
        id: '1',
        nome: 'prova',
        obsoleta: false,
        descrizione: 'descrizione',
        tipologia: 'ambito',
        versione: 'V1',
      },
    ];
    await service.findAll();
    const numeroConpetenze = service.lista.length;
    const id = service.lista.at(0).id;
    expect(() => service.remove(id + 1)).toThrow(NotFoundException);
    const res = service.remove(id);
    expect(service.lista).not.toContain(res.persona);
    expect(numeroConpetenze).toEqual(service.lista.length + 1);
  });
  it('should modifica conoscenza con lista vuota oppure con id sbagliato Errore NotFoundException', function () {
    expect(() => service.update('', conpetenzeSet)).toThrow(NotFoundException);
    service.lista = [
      {
        id: '1',
        nome: 'prova',
        obsoleta: false,
        descrizione: 'descrizione',
        tipologia: 'ambito',
        versione: 'V1',
      },
    ];
    expect(() => service.update('2', conpetenzeSet)).toThrow(NotFoundException);
    expect(() => service.update('1', conpetenzeSet)).not.toThrow(
      NotFoundException,
    );
  });
  it('should creazione competenza', async () => {
    const objCreate = await service.create({
      nome: 'Proviamo',
      descrizione: 'Adesso che posiamo',
      obsoleta: true,
      tipologia: 'ambito',
      versione: 'uno',
      id: null,
    });
    const res = service.lista.at(0);
    expect(res).toBeDefined();
    expect(res).toEqual(objCreate);
  });
  it('should modifica conoscenza response con conoscenza modificata e lista persona con persona modificata', function () {
    service.lista = [
      {
        id: '1',
        nome: 'prova',
        obsoleta: false,
        descrizione: 'descrizione',
        tipologia: 'ambito',
        versione: 'V1',
      },
    ];
    const res = service.update('1', conpetenzeSet);
    expect(res.competenze).toEqual({...conpetenzeSet, id: '1'});
    expect(service.lista).toContain(res.competenze);
  });
});
