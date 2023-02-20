import {Test, TestingModule} from '@nestjs/testing';
import {ConoscenzaService} from './conoscenza.service';
import {HttpModule} from '@nestjs/axios';
import {ServiceModelClass} from "../shared/models/service.model";

describe('ConoscenzaService', () => {
  let service: ConoscenzaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConoscenzaService],
      imports: [HttpModule],
    }).compile();

    service = module.get<ConoscenzaService>(ConoscenzaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should findAll with true called method createListWithUUID', async () => {
    const spy = jest.spyOn(service, 'createListWithUUID');
    await expect(service.findAll(true)).resolves.toBeDefined();
    expect(spy).toBeCalled();
  });
  it('should findAll with false not called method createListWithUUID', async () => {
    const spy = jest.spyOn(service, 'createListWithUUID');
    await expect(service.findAll(false)).resolves.toBeDefined();
    expect(spy).not.toBeCalled();
  });
});
