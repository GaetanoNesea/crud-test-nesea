import { PartialType } from '@nestjs/mapped-types';
import { CreateCompetenzeDto } from './create-competenze.dto';

export class UpdateCompetenzeDto extends PartialType(CreateCompetenzeDto) {}
