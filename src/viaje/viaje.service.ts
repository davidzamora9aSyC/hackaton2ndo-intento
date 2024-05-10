import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ViajeEntity } from './viaje.entity/viaje.entity';

@Injectable()
export class ViajeService {
    constructor(
        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>,
    ) {}

    async findAll(): Promise<ViajeEntity[]> {
        return await this.viajeRepository.find({ relations: ['conductor', 'pasajero'] });
    }

    async findOne(id: string): Promise<ViajeEntity> {
        const viaje = await this.viajeRepository.findOne({
            where: { id: parseInt(id) },
            relations: ['conductor', 'pasajero']
        });
        if (!viaje) {
            throw new NotFoundException(`Viaje with ID ${id} not found`);
        }
        return viaje;
    }
    

    async create(viaje: ViajeEntity): Promise<ViajeEntity> {
        return await this.viajeRepository.save(viaje);
    }

    async update(id: string, viaje: ViajeEntity): Promise<ViajeEntity> {
        const updated = await this.viajeRepository.preload({
            id: parseInt(id),
            ...viaje,
        });
        if (!updated) {
            throw new NotFoundException(`Viaje with ID ${id} not found`);
        }
        return this.viajeRepository.save(updated);
    }

    async delete(id: string): Promise<void> {
        const result = await this.viajeRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Viaje with ID ${id} not found`);
        }
    }
}
