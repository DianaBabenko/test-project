import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let service: HttpService<any>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HttpService],
    }).compile();

    service = module.get<HttpService<any>>(HttpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
