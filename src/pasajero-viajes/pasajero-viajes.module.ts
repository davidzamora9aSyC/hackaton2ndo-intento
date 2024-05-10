import { Module } from '@nestjs/common';
import { PasajeroViajesService } from './pasajero-viajes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PasajeroEntity } from 'src/pasajero/pasajero.entity/pasajero.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { PasajeroViajesController } from './pasajero-viajes.controller';

@Module({
  imports:[TypeOrmModule.forFeature([PasajeroEntity, ViajeEntity])],
  providers: [PasajeroViajesService],
  controllers: [PasajeroViajesController]
})
export class PasajeroViajesModule {}
