import { PartialType } from '@nestjs/mapped-types';
import { CreateConoscenzaDto } from './create-conoscenza.dto';

export class UpdateConoscenzaDto extends PartialType(CreateConoscenzaDto) {}
