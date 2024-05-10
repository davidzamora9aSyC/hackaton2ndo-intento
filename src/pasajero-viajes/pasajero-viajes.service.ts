import { Injectable } from '@nestjs/common';
import { PasajeroEntity } from 'src/pasajero/pasajero.entity/pasajero.entity';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from 'src/shared/errors/business-errors';
import { BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class PasajeroViajesService {
    constructor(
        @InjectRepository(PasajeroEntity)
        private readonly pasajeroRepository: Repository<PasajeroEntity>,

        @InjectRepository(ViajeEntity)
        private readonly viajeRepository: Repository<ViajeEntity>
    ) {}

    async addViajePasajero(pasajeroId: string, viajeId: number): Promise<PasajeroEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND);
      
        const pasajero: PasajeroEntity = await this.pasajeroRepository.findOne({where: {id: pasajeroId}, relations: ["viajes"]})
        if (!pasajero)
          throw new BusinessLogicException("The pasajero with the given id was not found", BusinessError.NOT_FOUND);
    
        pasajero.viajes = [...pasajero.viajes, viaje];
        return await this.pasajeroRepository.save(pasajero);
      }
    
    async findViajeByPasajeroIdViajeId(pasajeroId: string, viajeId: number): Promise<ViajeEntity> {
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
       
        const pasajero: PasajeroEntity = await this.pasajeroRepository.findOne({where: {id: pasajeroId}, relations: ["viajes"]});
        if (!pasajero)
          throw new BusinessLogicException("The pasajero with the given id was not found", BusinessError.NOT_FOUND)
   
        const pasajeroViaje: ViajeEntity = pasajero.viajes.find(e => e.id === viaje.id);
   
        if (!pasajeroViaje)
          throw new BusinessLogicException("The viaje with the given id is not associated to the pasajero", BusinessError.PRECONDITION_FAILED)
   
        return pasajeroViaje;
    }
    
    async findViajesByPasajeroId(pasajeroId: string): Promise<ViajeEntity[]> {
        const pasajero: PasajeroEntity = await this.pasajeroRepository.findOne({where: {id: pasajeroId}, relations: ["viajes"]});
        if (!pasajero)
          throw new BusinessLogicException("The pasajero with the given id was not found", BusinessError.NOT_FOUND)
       
        return pasajero.viajes;
    }
    
    async associateViajesPasajero(pasajeroId: string, viajes: ViajeEntity[]): Promise<PasajeroEntity> {
        const pasajero: PasajeroEntity = await this.pasajeroRepository.findOne({where: {id: pasajeroId}, relations: ["viajes"]});
    
        if (!pasajero)
          throw new BusinessLogicException("The pasajero with the given id was not found", BusinessError.NOT_FOUND)
    
        for (let i = 0; i < viajes.length; i++) {
          const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajes[i].id}});
          if (!viaje)
            throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
        }
    
        pasajero.viajes = viajes;
        return await this.pasajeroRepository.save(pasajero);
      }
    
    async deleteViajePasajero(pasajeroId: string, viajeId: number){
        const viaje: ViajeEntity = await this.viajeRepository.findOne({where: {id: viajeId}});
        if (!viaje)
          throw new BusinessLogicException("The viaje with the given id was not found", BusinessError.NOT_FOUND)
    
        const pasajero: PasajeroEntity = await this.pasajeroRepository.findOne({where: {id: pasajeroId}, relations: ["viajes"]});
        if (!pasajero)
          throw new BusinessLogicException("The pasajero with the given id was not found", BusinessError.NOT_FOUND)
    
        const pasajeroViaje: ViajeEntity = pasajero.viajes.find(e => e.id === viaje.id);
    
        if (!pasajeroViaje)
            throw new BusinessLogicException("The viaje with the given id is not associated to the pasajero", BusinessError.PRECONDITION_FAILED)
 
        pasajero.viajes = pasajero.viajes.filter(e => e.id !== viajeId);
        await this.pasajeroRepository.save(pasajero);
    }  
}
