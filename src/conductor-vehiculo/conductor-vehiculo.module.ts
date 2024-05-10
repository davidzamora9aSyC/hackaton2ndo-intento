import { Module } from '@nestjs/common';
import { ConductorVehiculoService } from './conductor-vehiculo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { VehiculoEntity } from 'src/vehiculo/vehiculo.entity/vehiculo.entity';
import { ConductorVehiculoController } from './conductor-vehiculo.controller';
@Module({
  imports:[TypeOrmModule.forFeature([ConductorEntity, VehiculoEntity])],
  providers: [ConductorVehiculoService],
  controllers: [ConductorVehiculoController]
})
export class ConductorVehiculoModule {}
