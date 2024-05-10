import { Test, TestingModule } from '@nestjs/testing';
import { PasajeroViajesService } from './pasajero-viajes.service';

describe('PasajeroViajesService', () => {
  let service: PasajeroViajesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PasajeroViajesService],
    }).compile();

    service = module.get<PasajeroViajesService>(PasajeroViajesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
