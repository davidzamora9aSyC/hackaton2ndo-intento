import { Injectable } from '@nestjs/common';
import { ConductorEntity } from 'src/conductor/conductor.entity/conductor.entity';
import { VehiculoEntity } from 'src/vehiculo/vehiculo.entity/vehiculo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BusinessLogicException } from 'src/shared/errors/business-errors';
import { BusinessError } from 'src/shared/errors/business-errors';

@Injectable()
export class ConductorVehiculoService {
    constructor(
        @InjectRepository(ConductorEntity)
        private readonly conductorRepository: Repository<ConductorEntity>,

        @InjectRepository(VehiculoEntity)
        private readonly vehiculoRepository: Repository<VehiculoEntity>
    ) {}

    async addVehiculoConductor(conductorId: string, vehiculoId: string): Promise<ConductorEntity> {
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({where: {id: vehiculoId}});
        if (!vehiculo)
          throw new BusinessLogicException("The vehiculo with the given id was not found", BusinessError.NOT_FOUND);
      
        const conductor: ConductorEntity = await this.conductorRepository.findOne({where: {id: conductorId}, relations: ["vehiculo"]})
        if (!conductor)
          throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND);
    
        conductor.vehiculo = vehiculo;
        return await this.conductorRepository.save(conductor);
      }

   
      async findVehiculoByConductorId(conductorId: string): Promise<VehiculoEntity> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["vehiculo"] });
        if (!conductor) {
            throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND);
        }
    
        return conductor.vehiculo;
    }

    async associateVehiculoConductor(conductorId: string, vehiculoId: string): Promise<ConductorEntity> {
        const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["vehiculo"] });
        
        if (!conductor) {
            throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND);
        }
    
        const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({ where: { id: vehiculoId } });
        if (!vehiculo) {
            throw new BusinessLogicException("The vehiculo with the given id was not found", BusinessError.NOT_FOUND);
        }
    
        conductor.vehiculo = vehiculo;
        return await this.conductorRepository.save(conductor);
    }

    
async deleteVehiculoConductor(conductorId: string, vehiculoId: string) {
    const vehiculo: VehiculoEntity = await this.vehiculoRepository.findOne({ where: { id: vehiculoId } });
    if (!vehiculo)
        throw new BusinessLogicException("The vehiculo with the given id was not found", BusinessError.NOT_FOUND);

    const conductor: ConductorEntity = await this.conductorRepository.findOne({ where: { id: conductorId }, relations: ["vehiculo"] });
    if (!conductor)
        throw new BusinessLogicException("The conductor with the given id was not found", BusinessError.NOT_FOUND);

    if (!conductor.vehiculo || conductor.vehiculo.id !== vehiculoId)
        throw new BusinessLogicException("The vehiculo with the given id is not associated to the conductor", BusinessError.PRECONDITION_FAILED);

    conductor.vehiculo = null;
    await this.conductorRepository.save(conductor);
}

}
