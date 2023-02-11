import { Test, TestingModule } from '@nestjs/testing';
import { PersoneController } from './persone.controller';
import { PersoneService } from './persone.service';

describe('PersoneController', () => {
  let controller: PersoneController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersoneController],
      providers: [PersoneService],
    }).compile();

    controller = module.get<PersoneController>(PersoneController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
