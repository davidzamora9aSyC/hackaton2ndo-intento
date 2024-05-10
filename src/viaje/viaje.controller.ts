import { ViajeService } from './viaje.service';
import { ViajeDto } from './viaje.dto/viaje.dto';
import { ViajeEntity } from './viaje.entity/viaje.entity';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';

@Controller('viajes')
@UseInterceptors(BusinessErrorsInterceptor)
export class ViajeController {
    constructor(private readonly viajeService: ViajeService) { }

    @Get()
    async findAll() {
        return await this.viajeService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.viajeService.findOne(id);
    }

    @Post()
    async create(@Body() viajeDto: ViajeDto) {
        const viaje: ViajeEntity = plainToInstance(ViajeEntity, viajeDto);
        return await this.viajeService.create(viaje);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() viajeDto: ViajeDto) {
        const viaje: ViajeEntity = plainToInstance(ViajeEntity, viajeDto);
        return await this.viajeService.update(id, viaje);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return await this.viajeService.delete(id);
    }
}
