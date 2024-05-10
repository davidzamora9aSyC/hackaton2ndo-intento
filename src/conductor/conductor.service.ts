import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ConductorEntity } from './conductor.entity/conductor.entity';

@Injectable()
export class ConductorService {
    constructor(
        @InjectRepository(ConductorEntity)
        private readonly conductorRepository: Repository<ConductorEntity>,
    ) {}

    async findAll(): Promise<ConductorEntity[]> {
        return await this.conductorRepository.find();
    }

    async findOne(id: string): Promise<ConductorEntity> {
        const conductor = await this.conductorRepository.findOne({
            where: { id: id }
        });
        if (!conductor) {
            throw new NotFoundException(`Conductor with ID ${id} not found`);
        }
        return conductor;
    }

    async create(conductor: ConductorEntity): Promise<ConductorEntity> {
        return await this.conductorRepository.save(conductor);
    }

    async update(id: string, conductorData: ConductorEntity): Promise<ConductorEntity> {
        const updatedConductor = await this.conductorRepository.preload({
            id: parseInt(id),
            ...conductorData,
        });
        if (!updatedConductor) {
            throw new NotFoundException(`Conductor with ID ${id} not found`);
        }
        return this.conductorRepository.save(updatedConductor);
    }

    async delete(id: string): Promise<void> {
        const result = await this.conductorRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Conductor with ID ${id} not found`);
        }
    }
}
