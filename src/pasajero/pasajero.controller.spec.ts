import { Test, TestingModule } from '@nestjs/testing';
import { PasajeroController } from './pasajero.controller';

describe('PasajeroController', () => {
  let controller: PasajeroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PasajeroController],
    }).compile();

    controller = module.get<PasajeroController>(PasajeroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
