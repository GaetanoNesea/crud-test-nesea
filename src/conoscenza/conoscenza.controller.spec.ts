import { Test, TestingModule } from '@nestjs/testing';
import { ConoscenzaController } from './conoscenza.controller';
import { ConoscenzaService } from './conoscenza.service';

describe('ConoscenzaController', () => {
  let controller: ConoscenzaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ConoscenzaController],
      providers: [ConoscenzaService],
    }).compile();

    controller = module.get<ConoscenzaController>(ConoscenzaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
