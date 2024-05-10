import { Controller, Get, Post, Put, Delete, Param, HttpCode, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ConductorVehiculoService } from './conductor-vehiculo.service';

@Controller('conductor-vehiculo')
@UseInterceptors(BusinessErrorsInterceptor)
export class ConductorVehiculoController {
    constructor(private readonly conductorVehiculoService: ConductorVehiculoService) {}

    @Post(':conductorId/vehiculo/:vehiculoId')
    async addVehiculoToConductor(@Param('conductorId') conductorId: string, @Param('vehiculoId') vehiculoId: string) {
        return await this.conductorVehiculoService.addVehiculoConductor(conductorId, vehiculoId);
    }

    @Get(':conductorId/vehiculo')
    async findVehiculoByConductorId(@Param('conductorId') conductorId: string) {
        return await this.conductorVehiculoService.findVehiculoByConductorId(conductorId);
    }

    @Put(':conductorId/vehiculo/:vehiculoId')
    async associateVehiculoWithConductor(@Param('conductorId') conductorId: string, @Param('vehiculoId') vehiculoId: string) {
        return await this.conductorVehiculoService.associateVehiculoConductor(conductorId, vehiculoId);
    }

    @Delete(':conductorId/vehiculo/:vehiculoId')
    @HttpCode(204)
    async deleteVehiculoFromConductor(@Param('conductorId') conductorId: string, @Param('vehiculoId') vehiculoId: string) {
        return await this.conductorVehiculoService.deleteVehiculoConductor(conductorId, vehiculoId);
    }
}
