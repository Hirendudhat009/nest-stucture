import { IsString, IsInt } from 'class-validator';

export class CarDto {
  @IsInt()
  readonly id: number;

  @IsString()
  readonly brand: string;
  @IsString()
  readonly color: string;
  @IsString()
  readonly model: string;
}
