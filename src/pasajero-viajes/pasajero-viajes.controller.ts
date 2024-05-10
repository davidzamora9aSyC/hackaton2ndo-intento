import { Controller, Get, Post, Put, Delete, Param, Body, HttpCode, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { PasajeroViajesService } from './pasajero-viajes.service';
import { ViajeEntity } from 'src/viaje/viaje.entity/viaje.entity';

@Controller('pasajero-viajes')
@UseInterceptors(BusinessErrorsInterceptor)
export class PasajeroViajesController {
    constructor(private readonly pasajeroViajesService: PasajeroViajesService) {}

    @Post(':pasajeroId/viajes/:viajeId')
    async addViajeToPasajero(@Param('pasajeroId') pasajeroId: string, @Param('viajeId') viajeId: number) {
        return await this.pasajeroViajesService.addViajePasajero(pasajeroId, viajeId);
    }

    @Get(':pasajeroId/viajes/:viajeId')
    async findViajeByPasajeroIdViajeId(@Param('pasajeroId') pasajeroId: string, @Param('viajeId') viajeId: number) {
        return await this.pasajeroViajesService.findViajeByPasajeroIdViajeId(pasajeroId, viajeId);
    }

    @Get(':pasajeroId/viajes')
    async findViajesByPasajeroId(@Param('pasajeroId') pasajeroId: string) {
        return await this.pasajeroViajesService.findViajesByPasajeroId(pasajeroId);
    }

    @Put(':pasajeroId/viajes')
    async associateViajesWithPasajero(@Param('pasajeroId') pasajeroId: string, @Body() viajes: ViajeEntity[]) {
        return await this.pasajeroViajesService.associateViajesPasajero(pasajeroId, viajes);
    }

    @Delete(':pasajeroId/viajes/:viajeId')
    @HttpCode(204)
    async deleteViajeFromPasajero(@Param('pasajeroId') pasajeroId: string, @Param('viajeId') viajeId: number) {
        return await this.pasajeroViajesService.deleteViajePasajero(pasajeroId, viajeId);
    }
}
