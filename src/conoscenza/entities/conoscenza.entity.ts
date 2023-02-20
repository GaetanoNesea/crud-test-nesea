import {ConoscenzaModel} from '../models/conoscenza.model';
import {v4 as uuidv4} from 'uuid';
import {IPersona} from '../../persone/models/personeResponse.model';

export class Conoscenza implements ConoscenzaModel {
  id: string;
  constructor(public nome: string, public descrizione: string) {
    this.id = uuidv4();
  }

  static createId(data: ConoscenzaModel[]) {
    return data.map((conoscenza) => ({...conoscenza, id: uuidv4()}));
  }
}
