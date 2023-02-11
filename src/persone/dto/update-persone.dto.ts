import { PartialType } from '@nestjs/mapped-types';
import { CreatePersoneDto } from './create-persone.dto';

export class UpdatePersoneDto extends PartialType(CreatePersoneDto) {}
