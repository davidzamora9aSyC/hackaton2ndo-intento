import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { VehiculoService } from './vehiculo.service';
import { VehiculoDto } from './vehiculo.dto/vehiculo.dto';
import { VehiculoEntity } from './vehiculo.entity/vehiculo.entity';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';

@Controller('vehiculos')
@UseInterceptors(BusinessErrorsInterceptor)
export class VehiculoController {
    constructor(private readonly vehiculoService: VehiculoService) { }

    @Get()
    async findAll() {
        return await this.vehiculoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.vehiculoService.findOne(id);
    }

    @Post()
    async create(@Body() vehiculoDto: VehiculoDto) {
        const vehiculo: VehiculoEntity = plainToInstance(VehiculoEntity, vehiculoDto);
        return await this.vehiculoService.create(vehiculo);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() vehiculoDto: VehiculoDto) {
        const vehiculo: VehiculoEntity = plainToInstance(VehiculoEntity, vehiculoDto);
        return await this.vehiculoService.update(id, vehiculo);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return await this.vehiculoService.delete(id);
    }
}
