import { ConductorService } from './conductor.service';
import { ConductorDto } from './conductor.dto/conductor.dto';
import { ConductorEntity } from './conductor.entity/conductor.entity';
import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from 'src/shared/interceptors/business-errors.interceptor';
import { plainToInstance } from 'class-transformer';

@Controller('conductores')
@UseInterceptors(BusinessErrorsInterceptor)
export class ConductorController {
    constructor(private readonly conductorService: ConductorService) { }

    @Get()
    async findAll() {
        return await this.conductorService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.conductorService.findOne(id);
    }

    @Post()
    async create(@Body() conductorDto: ConductorDto) {
        const conductor: ConductorEntity = plainToInstance(ConductorEntity, conductorDto);
        return await this.conductorService.create(conductor);
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() conductorDto: ConductorDto) {
        const conductor: ConductorEntity = plainToInstance(ConductorEntity, conductorDto);
        return await this.conductorService.update(id, conductor);
    }

    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: string) {
        return await this.conductorService.delete(id);
    }
}
