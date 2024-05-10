import { Module } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehiculoEntity } from './vehiculo.entity/vehiculo.entity';
import { VehiculoController } from './vehiculo.controller';

@Module({
  imports: [TypeOrmModule.forFeature([VehiculoEntity])],
  providers: [VehiculoService],
  controllers: [VehiculoController]
})
export class VehiculoModule {}
