import { Test, TestingModule } from '@nestjs/testing';
import { CompetenzeController } from './competenze.controller';
import { CompetenzeService } from './competenze.service';

describe('CompetenzeController', () => {
  let controller: CompetenzeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CompetenzeController],
      providers: [CompetenzeService],
    }).compile();

    controller = module.get<CompetenzeController>(CompetenzeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
