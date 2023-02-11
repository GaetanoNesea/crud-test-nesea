import { Test, TestingModule } from '@nestjs/testing';
import { CompetenzeService } from './competenze.service';

describe('CompetenzeService', () => {
  let service: CompetenzeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CompetenzeService],
    }).compile();

    service = module.get<CompetenzeService>(CompetenzeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
