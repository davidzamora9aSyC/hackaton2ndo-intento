import { Module } from '@nestjs/common';
import { PasajeroViajesService } from './pasajero-viajes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasajeroEntity } from 'src/pasajero/pasajero.entity/pasajero.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';

@Module({
  imports:[TypeOrmModule.forFeature([PasajeroEntity, ViajeEntity])],
  providers: [PasajeroViajesService]
})
export class PasajeroViajesModule {}
