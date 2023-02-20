import { ProvaModel } from '../../shared/models/prova.model';

export interface ConoscenzaModel extends ProvaModel {
  nome: string;
  descrizione: string;
}
