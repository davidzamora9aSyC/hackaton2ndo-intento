import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PasajeroModule } from './pasajero/pasajero.module';
import { ViajeModule } from './viaje/viaje.module';
import { ConductorModule } from './conductor/conductor.module';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorEntity } from './conductor/conductor.entity/conductor.entity';
import { ViajeEntity } from './viaje/viaje.entity/viaje.entity';
import { PasajeroEntity } from './pasajero/pasajero.entity/pasajero.entity';
import { VehiculoEntity } from './vehiculo/vehiculo.entity/vehiculo.entity';
import { PasajeroViajesModule } from './pasajero-viajes/pasajero-viajes.module';
import { ConductorViajesModule } from './conductor-viajes/conductor-viajes.module';
import { ConductorVehiculoModule } from './conductor-vehiculo/conductor-vehiculo.module';

@Module({
  imports: [PasajeroModule, ViajeModule, ConductorModule, VehiculoModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5433,
      username: 'postgres',
      password: 'postgres',
      database: 'uber2',
      entities: [ConductorEntity, ViajeEntity, PasajeroEntity, VehiculoEntity],
      dropSchema: true,
      synchronize: true,
      keepConnectionAlive: true
    }),
    PasajeroViajesModule,
    ConductorViajesModule,
    ConductorVehiculoModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
