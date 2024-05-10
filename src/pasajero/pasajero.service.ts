import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasajeroEntity } from './pasajero.entity/pasajero.entity';
import { BusinessLogicException } from 'src/shared/errors/business-errors';
import { BusinessError } from 'src/shared/errors/business-errors';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class PasajeroService {
    constructor(
        @InjectRepository(PasajeroEntity)
        private readonly pasajeroRepository: Repository<PasajeroEntity>
    ){}

    async findAll(): Promise<PasajeroEntity[]> {
        return await this.pasajeroRepository.find({ relations: ["viajes"] });
    }

    async findOne(id: string): Promise<PasajeroEntity> {
        const pasajero: PasajeroEntity = await this.pasajeroRepository.findOne({where: {id}, relations: ["viajes"] } );
        if (!pasajero)
          throw new BusinessLogicException("The user with the given id was not found", BusinessError.NOT_FOUND);
   
        return pasajero;
    }


    async create(pasajero: PasajeroEntity): Promise<PasajeroEntity> {
        return await this.pasajeroRepository.save(pasajero);
    }

    async update(id: string, pasajero: PasajeroEntity): Promise<PasajeroEntity> {
        const updated = await this.pasajeroRepository.preload({
            id: parseInt(id),
            ...pasajero,
        });
        if (!updated) {
            throw new NotFoundException(`Pasajero with ID ${id} not found`);
        }
        return this.pasajeroRepository.save(updated);
    }

    async delete(id: string) {
        const museum: PasajeroEntity = await this.pasajeroRepository.findOne({where:{id}});
        if (!museum)
          throw new BusinessLogicException("passenger with the given id was not found", BusinessError.NOT_FOUND);
     
        await this.pasajeroRepository.remove(museum);
    }
}
