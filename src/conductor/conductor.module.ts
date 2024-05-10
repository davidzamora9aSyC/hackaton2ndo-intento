import { Module } from '@nestjs/common';
import { ConductorService } from './conductor.service';
import { ConductorController } from './conductor.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConductorEntity } from './conductor.entity/conductor.entity';

@Module({
  providers: [ConductorService],
  controllers: [ConductorController],
  imports: [TypeOrmModule.forFeature([ConductorEntity])]

})
export class ConductorModule {}
