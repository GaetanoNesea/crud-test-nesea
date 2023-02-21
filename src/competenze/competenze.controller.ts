import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import {CompetenzeService} from './competenze.service';
import {CreateCompetenzeDto} from './dto/create-competenze.dto';
import {UpdateCompetenzeDto} from './dto/update-competenze.dto';

@Controller('competenze')
export class CompetenzeController {
  constructor(private readonly competenzeService: CompetenzeService) {}

  @Post()
  create(@Body() createCompetenzeDto: CreateCompetenzeDto) {
    return this.competenzeService.create(createCompetenzeDto);
  }

  @Get()
  findAll() {
    return this.competenzeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.competenzeService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCompetenzeDto: UpdateCompetenzeDto,
  ) {
    return this.competenzeService.update(id, updateCompetenzeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.competenzeService.remove(id);
  }
}
