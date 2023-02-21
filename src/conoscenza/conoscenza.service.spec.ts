import {Test, TestingModule} from '@nestjs/testing';
import {ConoscenzaService} from './conoscenza.service';
import {HttpModule} from '@nestjs/axios';
import {Observable} from 'rxjs';
import {AxiosResponse} from 'axios/index';
import {IPersona} from '../persone/models/personeResponse.model';
import {ConoscenzaModel} from './models/conoscenza.model';
import {NotFoundException} from '@nestjs/common';
import {UpdateConoscenzaDto} from './dto/update-conoscenza.dto';

describe('ConoscenzaService', () => {
  let service: ConoscenzaService;
  let apiEsterna: jest.SpyInstance<
    Observable<AxiosResponse<ConoscenzaModel[], any>>,
    []
  >;
  let createUUID: jest.SpyInstance<
    ConoscenzaModel[],
    [data: ConoscenzaModel[]]
  >;
  let conoscenzaSet: UpdateConoscenzaDto;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConoscenzaService],
      imports: [HttpModule],
    }).compile();

    service = module.get<ConoscenzaService>(ConoscenzaService);
    apiEsterna = jest.spyOn(service, 'getPersonaAPI');
    createUUID = jest.spyOn(service, 'createListWithUUID');
    conoscenzaSet = {
      nome: 'Prova',
      descrizione: 'Test della descrizione',
    };
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should lista conoscenza vuota quando creo il service', function () {
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
    service.create({nome: 'Prova', descrizione: 'Adesso proviamo con una'});
    // service.lista = [{nome: '', descrizione: '', id: '1'}];
    await service.findAll();
    expect(apiEsterna).toBeCalledTimes(0);
    expect(createUUID).toBeCalledTimes(0);
    expect(service.lista).toHaveLength(1);
  });

  it('should creazione conooscenza', async () => {
    const objCreate = await service.create({
      nome: 'Proviamo',
      descrizione: 'Adesso che possiamo',
    });
    const res = service.lista.at(0);
    expect(res).toBeDefined();
    expect(res).toEqual(objCreate);
  });

  it('should errore ricerca conoscenza', function () {
    expect(() => service.findOne('')).toThrow(NotFoundException);
  });

  it('should findOne', async () => {
    // let res = service.findOne('');
    service.lista = [{nome: '', descrizione: '', id: '1'}];
    // await service.findAll();
    const id = service.lista.at(0).id;
    const res = service.findOne(id);
    expect(res).toEqual({
      find: 1,
      message: 'OK',
      conoscenza: service.lista.at(0),
    });
  });

  it('should remove conoscenza con lista vuota NotfoundException', function () {
    expect(() => service.remove('')).toThrow(NotFoundException);
  });

  it('should remove persona con id sbagliato', async () => {
    // let res = service.findOne('');
    service.lista = [{nome: '', descrizione: '', id: '1'}];
    await service.findAll();
    const numeroConoscenze = service.lista.length;
    const id = service.lista.at(0).id;
    expect(() => service.remove(id + 1)).toThrow(NotFoundException);
    const res = service.remove(id);
    expect(service.lista).not.toContain(res.persona);
    expect(numeroConoscenze).toEqual(service.lista.length + 1);
  });

  it('should modifica conoscenza con lista vuota oppure con id sbagliato Errore NotFoundException', async () => {
    expect(() => service.update('', conoscenzaSet)).toThrow(NotFoundException);
    const res = await service.create({nome: 'Proviamo', descrizione: 'Adesso'});
    expect(() => service.update('2', conoscenzaSet)).toThrow(NotFoundException);
    expect(() => service.update(res.id, conoscenzaSet)).not.toThrow(
      NotFoundException,
    );
  });

  it('should modifica conoscenza response con conoscenza modificata e lista persona con persona modificata', async () => {
    const result = await service.create({
      nome: 'Proviamo',
      descrizione: 'Adesso',
    });
    const res = service.update(result.id, conoscenzaSet);
    expect(res.conoscenza).toEqual({...conoscenzaSet, id: result.id});
    expect(service.lista).toContain(res.conoscenza);
  });
});
