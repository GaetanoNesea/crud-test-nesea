import {ProvaModel} from '../../shared/models/prova.model';

export interface CompetenzeModel extends ProvaModel {
  nome: string;
  descrizione: string;
  tipologia: 'ambito' | 'tecnica';
  versione: string;
  obsoleta: boolean;
}
