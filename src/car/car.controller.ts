import {
  Body,
  Controller,
  Delete,
  Get,
  HostParam,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CarDto } from './car.dto';
import { CarService } from './car.service';
import { HttpExceptionFilter } from '../filter/exception-heep.filter';

@Controller('car')
export class CarController {
  constructor(private carservice: CarService) {}

  @Get()
  async getCars() {
    return this.carservice.getCars();
  }

  @Post()
  async postCars(@Body(ValidationPipe) car: CarDto) {
    return this.carservice.postCars(car);
  }

  @Get('/:id')
  // @UsePipes(ValidationPipe)
  // @UseFilters(HttpExceptionFilter)
  getCarById(@Param('id', ParseIntPipe) id: number) {
    return this.carservice.getCarById(id);
  }

  @Delete('/:id')
  async deleteCarById(@Param('id') id: number) {
    return this.carservice.deleteCarById(id);
  }

  @Put('/:id')
  async putCarById(@Param('id') id: number, @Query() query) {
    const propartyName = query.property_name;
    const propartyValue = query.property_value;

    return this.carservice.putCarById(id, propartyName, propartyValue);
  }
}
