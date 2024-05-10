import { Test, TestingModule } from '@nestjs/testing';
import { ConductorViajesService } from './conductor-viajes.service';

describe('ConductorViajesService', () => {
  let service: ConductorViajesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ConductorViajesService],
    }).compile();

    service = module.get<ConductorViajesService>(ConductorViajesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
