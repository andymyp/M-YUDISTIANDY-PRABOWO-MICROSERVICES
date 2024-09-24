import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class CreateVehicleDto {
  @IsString()
  @IsNotEmpty()
  registrationNumber: string;

  @IsString()
  @IsNotEmpty()
  model: string;

  @IsNumber()
  @IsNotEmpty()
  @MinLength(1)
  year: number;

  @IsString()
  @IsNotEmpty()
  color: string;
}
