import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {PersoneService} from './persone.service';
import {CreatePersoneDto} from './dto/create-persone.dto';
import {UpdatePersoneDto} from './dto/update-persone.dto';
import {AuthGuard} from '@nestjs/passport';

@Controller('persone')
export class PersoneController {
  constructor(private readonly personeService: PersoneService) {}

  @Post()
  create(@Body() createPersoneDto: CreatePersoneDto) {
    return this.personeService.create(createPersoneDto);
  }

  @UseGuards(AuthGuard('local'))
  @Get()
  async findAll() {
    return await this.personeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personeService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersoneDto: UpdatePersoneDto) {
    return this.personeService.update(id, updatePersoneDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personeService.remove(id);
  }
}
