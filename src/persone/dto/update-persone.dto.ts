import { PartialType } from '@nestjs/mapped-types';
import { CreatePersoneDto } from './create-persone.dto';
import { IsEmpty } from 'class-validator';

export class UpdatePersoneDto extends PartialType(CreatePersoneDto) {
  @IsEmpty()
  id: string;
}
