import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ConoscenzaService } from './conoscenza.service';
import { CreateConoscenzaDto } from './dto/create-conoscenza.dto';
import { UpdateConoscenzaDto } from './dto/update-conoscenza.dto';

@Controller('conoscenza')
export class ConoscenzaController {
  constructor(private readonly conoscenzaService: ConoscenzaService) {}

  @Post()
  create(@Body() createConoscenzaDto: CreateConoscenzaDto) {
    return this.conoscenzaService.create(createConoscenzaDto);
  }

  @Get()
  findAll() {
    return this.conoscenzaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.conoscenzaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateConoscenzaDto: UpdateConoscenzaDto) {
    return this.conoscenzaService.update(+id, updateConoscenzaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.conoscenzaService.remove(+id);
  }
}
