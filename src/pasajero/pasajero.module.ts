import { Module } from '@nestjs/common';
import { PasajeroService } from './pasajero.service';
import { TypeOrmModule } from '@nestjs/typeorm';  
import { PasajeroEntity } from './pasajero.entity/pasajero.entity';
import { PasajeroController } from './pasajero.controller';


@Module({
  providers: [PasajeroService],
  imports:    [TypeOrmModule.forFeature([PasajeroEntity])],
  controllers: [PasajeroController],
})
export class PasajeroModule {}
