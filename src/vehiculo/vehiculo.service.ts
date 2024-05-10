import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { VehiculoEntity } from './vehiculo.entity/vehiculo.entity';

@Injectable()
export class VehiculoService {
    constructor(
        @InjectRepository(VehiculoEntity)
        private readonly vehiculoRepository: Repository<VehiculoEntity>,
    ) {}

    async findAll(): Promise<VehiculoEntity[]> {
        return await this.vehiculoRepository.find({ relations: ['conductor'] });
    }

    async findOne(id: string): Promise<VehiculoEntity> {
        const vehiculo = await this.vehiculoRepository.findOne({
            where: { id: id },
            relations: ['conductor']
        });
        if (!vehiculo) {
            throw new NotFoundException(`Vehículo with ID ${id} not found`);
        }
        return vehiculo;
    }

    async create(vehiculo: VehiculoEntity): Promise<VehiculoEntity> {
        return await this.vehiculoRepository.save(vehiculo);
    }

    async update(id: string, vehiculo: VehiculoEntity): Promise<VehiculoEntity> {
        const updated = await this.vehiculoRepository.preload({
            id: id,
            ...vehiculo,
        });
        if (!updated) {
            throw new NotFoundException(`Vehículo with ID ${id} not found`);
        }
        return this.vehiculoRepository.save(updated);
    }

    async delete(id: string): Promise<void> {
        const result = await this.vehiculoRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Vehículo with ID ${id} not found`);
        }
    }
}
