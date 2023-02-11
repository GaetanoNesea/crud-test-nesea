import { Test, TestingModule } from '@nestjs/testing';
import { ConoscenzaService } from './conoscenza.service';

describe('ConoscenzaService', () => {
  let service: ConoscenzaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConoscenzaService],
    }).compile();

    service = module.get<ConoscenzaService>(ConoscenzaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
