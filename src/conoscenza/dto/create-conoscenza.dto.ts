import { IsByteLength, IsNotEmpty, IsString } from 'class-validator';

export class CreateConoscenzaDto {
  @IsNotEmpty({ message: 'Nome non può essere vuoto' })
  @IsString({ message: 'Nome deve essere una stringa' })
  @IsByteLength(10, 15, {
    message: (validationArguments) => {
      const { constraints, value } = validationArguments;
      return `Nome value: ${value} length: ${value.length} lunghezza non valida, min: ${constraints[0]} max: ${constraints[1]}`;
    },
  })
  nome: string;

  @IsNotEmpty({ message: 'Descrizione non può essere vuoto' })
  @IsString({ message: 'Descrizione deve essere una stringa' })
  @IsByteLength(20, 30, {
    message: (validationArguments) => {
      const { constraints, value } = validationArguments;
      return `Descrizione value: ${value} length: ${value.length} lunghezza non valida, min: ${constraints[0]} max: ${constraints[1]}`;
    },
  })
  descrizione: string;
}
