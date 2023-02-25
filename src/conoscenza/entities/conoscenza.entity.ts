import {ConoscenzaModel} from '../models/conoscenza.model';
import {v4 as uuidv4} from 'uuid';

export class Conoscenza implements ConoscenzaModel {
  id: string;
  descrizione: string;
  nome: string;
  constructor({descrizione, nome}: ConoscenzaModel) {
    this.id = uuidv4();
    this.nome = nome;
    this.descrizione = descrizione;
  }
  
}
