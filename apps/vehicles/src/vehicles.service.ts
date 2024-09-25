import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesRepository } from './vehicles.repository';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async create(createVehicleDto: CreateVehicleDto) {
    await this.validateRegistrationNumber(createVehicleDto);
    return this.vehiclesRepository.create(createVehicleDto);
  }

  async findAll() {
    return this.vehiclesRepository.find({});
  }

  async findOne(_id: string) {
    return this.vehiclesRepository.findOne({ _id });
  }

  async update(_id: string, updateVehicleDto: UpdateVehicleDto) {
    return this.vehiclesRepository.findOneAndUpdate(
      { _id },
      { $set: updateVehicleDto },
    );
  }

  async remove(_id: string) {
    return this.vehiclesRepository.findOneAndDelete({ _id });
  }

  async validateRegistrationNumber(createVehicleDto: CreateVehicleDto) {
    try {
      await this.vehiclesRepository.findOne({
        registrationNumber: createVehicleDto.registrationNumber,
      });
    } catch (error) {
      return;
    }

    throw new UnprocessableEntityException('registrationNumber already exists');
  }
}
