import { Test, TestingModule } from '@nestjs/testing';
import { PersoneController } from './persone.controller';
import { PersoneService } from './persone.service';
import {HttpModule} from "@nestjs/axios";

describe('PersoneController', () => {
  let controller: PersoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersoneController],
      providers: [PersoneService],
      imports: [HttpModule],
    }).compile();

    controller = module.get<PersoneController>(PersoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
