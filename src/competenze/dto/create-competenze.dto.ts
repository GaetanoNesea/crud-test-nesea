import {CompetenzeModel} from '../model/competenze.model';
import {IsBoolean, IsEmpty, IsIn, IsNotEmpty, IsString} from 'class-validator';

export class CreateCompetenzeDto implements CompetenzeModel {
  @IsString()
  @IsNotEmpty()
  descrizione: string;

  @IsEmpty()
  id: string;

  @IsString()
  @IsNotEmpty()
  nome: string;

  @IsBoolean()
  @IsNotEmpty()
  obsoleta: boolean;

  @IsString()
  @IsIn(['ambito', 'tecnica'])
  @IsNotEmpty()
  tipologia: 'ambito' | 'tecnica';

  @IsString()
  @IsNotEmpty()
  versione: string;
}
