import {CompetenzeModel} from '../model/competenze.model';
import {v4 as uuidv4} from 'uuid';

export class Competenze implements CompetenzeModel {
  id: string;
  descrizione: string;
  nome: string;
  obsoleta: boolean;
  tipologia: 'ambito' | 'tecnica';
  versione: string;
  constructor({
    descrizione,
    nome,
    obsoleta,
    tipologia,
    versione,
  }: CompetenzeModel) {
    this.id = uuidv4();
    this.nome = nome;
    this.descrizione = descrizione;
    this.obsoleta = obsoleta;
    this.tipologia = tipologia;
    this.versione = versione;
  }

}
