import { Module } from '@nestjs/common';
import { ConductorViajesService } from './conductor-viajes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';


@Module({
  imports:[TypeOrmModule.forFeature([ConductorEntity, ViajeEntity])],
  providers: [ConductorViajesService]
})
export class ConductorViajesModule {}
