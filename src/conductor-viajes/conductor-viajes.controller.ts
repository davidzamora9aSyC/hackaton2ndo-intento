import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { ConductorViajesService } from './conductor-viajes.service';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';

@Controller('conductor')
@UseInterceptors(BusinessErrorsInterceptor)
export class ConductorViajesController {
    constructor(private readonly conductorViajesService: ConductorViajesService) {}

    @Post(':conductorId/viajes/:viajeId')
    async addViajeToConductor(@Param('conductorId') conductorId: string, @Param('viajeId') viajeId: number) {
        return await this.conductorViajesService.addViajeConductor(conductorId, viajeId);
    }

    @Get(':conductorId/viajes/:viajeId')
    async findViajeByConductorIdViajeId(@Param('conductorId') conductorId: string, @Param('viajeId') viajeId: number) {
        return await this.conductorViajesService.findViajeByConductorIdViajeId(conductorId, viajeId);
    }

    @Get(':conductorId/viajes')
    async findViajesByConductorId(@Param('conductorId') conductorId: string) {
        return await this.conductorViajesService.findViajesByConductorId(conductorId);
    }

    @Put(':conductorId/viajes')
    async associateViajesWithConductor(@Param('conductorId') conductorId: string, @Body() viajes: ViajeEntity[]) {
        return await this.conductorViajesService.associateViajesConductor(conductorId, viajes);
    }

    @Delete(':conductorId/viajes/:viajeId')
    @HttpCode(204)
    async deleteViajeFromConductor(@Param('conductorId') conductorId: string, @Param('viajeId') viajeId: number) {
        return await this.conductorViajesService.deleteViajeConductor(conductorId, viajeId);
    }
}
