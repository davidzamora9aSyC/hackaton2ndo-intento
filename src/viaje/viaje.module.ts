import { Module } from '@nestjs/common';
import { ViajeService } from './viaje.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ViajeEntity } from './viaje.entity/viaje.entity';
import { ViajeController } from './viaje.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ViajeEntity])],
  providers: [ViajeService],
  controllers: [ViajeController],

})
export class ViajeModule {}
