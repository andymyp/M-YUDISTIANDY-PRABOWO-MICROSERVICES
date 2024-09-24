import { Injectable } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesRepository } from './vehicles.repository';

@Injectable()
export class VehiclesService {
  constructor(private readonly vehiclesRepository: VehiclesRepository) {}

  async create(createVehicleDto: CreateVehicleDto) {
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
}
