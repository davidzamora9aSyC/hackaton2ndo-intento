import { Injectable } from '@nestjs/common';
import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from 'src/shared/errors/business-errors';
import { BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class ConductorViajesService {
    constructor(
        @InjectRepository(ConductorEntity)
        private readonly conductorRepository: Repository<ConductorEntity>,

        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>
    ) {}

    async addViajeConductor(conductorId: string, viajeId: number): Promise<ConductorEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND);
      
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes"]})
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND);
    
        conductor.viajes = [...conductor.viajes, viaje];
        return await this.conductorRepository.save(conductor);
      }
    
    async findViajeByConductorIdViajeId(conductorId: string, viajeId: number): Promise<ViajeEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
       
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes"]});
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)
   
        const conductorViaje: ViajeEntity = conductor.viajes.find(e => e.id === viaje.id);
   
        if (!conductorViaje)
          throw new BusinessLogicException("The viaje with the given id is not associated to the conductor", BusinessError.PRECONDITION_FAILED)
   
        return conductorViaje;
    }
    
    async findViajesByConductorId(conductorId: string): Promise<ViajeEntity[]> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes"]});
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)
       
        return conductor.viajes;
    }
    
    async associateViajesConductor(conductorId: string, viajes: ViajeEntity[]): Promise<ConductorEntity> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes"]});
    
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < viajes.length; i++) {
          const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajes[i].id}});
          if (!viaje)
            throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        conductor.viajes = viajes;
        return await this.conductorRepository.save(conductor);
      }
    
    async deleteViajeConductor(conductorId: string, viajeId: number){
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["viajes"]});
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND)
    
        const conductorViaje: ViajeEntity = conductor.viajes.find(e => e.id === viaje.id);
    
        if (!conductorViaje)
            throw new BusinessLogicException("The viaje with the given id is not associated to the conductor", BusinessError.PRECONDITION_FAILED)
 
        conductor.viajes = conductor.viajes.filter(e => e.id !== viajeId);
        await this.conductorRepository.save(conductor);
    }  
}
