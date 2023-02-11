import { Test, TestingModule } from '@nestjs/testing';
import { PersoneService } from './persone.service';

describe('PersoneService', () => {
  let service: PersoneService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersoneService],
    }).compile();

    service = module.get<PersoneService>(PersoneService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
