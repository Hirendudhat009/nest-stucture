import { HttpException, Injectable } from '@nestjs/common';
import { CARS } from './cars.mock';

@Injectable()
export class CarService {
  private cars = CARS;
  public getCars() {
    return this.cars;
  }

  public postCars(cars) {
    return this.cars.push(cars);
  }

  public getCarById(id: number): Promise<any> {
    const carId = Number(id);
    console.log(carId);
    return new Promise((resolve) => {
      const cars = this.cars.find((car) => car.id === carId);
      if (!cars) {
        throw new HttpException('Not Found', 404);
      }
      return resolve(cars);
    });
  }

  public deleteCarById(id: number): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === carId);
      if (index === -1) {
        throw new HttpException('Not Found', 404);
      }
      this.cars.splice(index, 1);
      return resolve(this.cars);
    });
  }

  public putCarById(
    id: number,
    propartyName: string,
    propartyValue: string,
  ): Promise<any> {
    const carId = Number(id);
    return new Promise((resolve) => {
      const index = this.cars.findIndex((car) => car.id === carId);
      if (index === -1) {
        throw new HttpException('Not Found', 404);
      }
      this.cars[index][propartyName] = propartyValue;
      return resolve(this.cars);
    });
  }
}
