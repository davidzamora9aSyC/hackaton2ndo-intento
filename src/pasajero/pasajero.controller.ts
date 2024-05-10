import { PasajeroService } from './pasajero.service';
import { PasajeroDto } from './pasajero.dto/pasajero.dto';
import { PasajeroEntity } from './pasajero.entity/pasajero.entity';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';

@Controller('pasajeros')
@UseInterceptors(BusinessErrorsInterceptor)
export class PasajeroController {
    constructor(private readonly pasajeroService: PasajeroService) { }

    @Get()
    async findAll() {
        return await this.pasajeroService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.pasajeroService.findOne(id);
    }

    @Post()
    async create(@Body() pasajeroDto: PasajeroDto) {
        const pasajero: PasajeroEntity = plainToInstance(PasajeroEntity, pasajeroDto);
        return await this.pasajeroService.create(pasajero);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() pasajeroDto: PasajeroDto) {
        const pasajero: PasajeroEntity = plainToInstance(PasajeroEntity, pasajeroDto);
        return await this.pasajeroService.update(id, pasajero);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return await this.pasajeroService.delete(id);
    }
}
