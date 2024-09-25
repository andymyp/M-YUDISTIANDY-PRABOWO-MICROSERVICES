import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { CreateVehicleDto } from './dto/create-vehicle.dto';
import { UpdateVehicleDto } from './dto/update-vehicle.dto';
import { VehiclesRepository } from './vehicles.repository';
import { User } from 'apps/auth/src/users/entities/user.entity';
import { RedisService } from '@app/common';

@Injectable()
export class VehiclesService {
  private readonly CACHE_KEY = 'vehicle_';

  constructor(
    private readonly vehiclesRepository: VehiclesRepository,
    private readonly redisService: RedisService,
  ) {}

  async create(user: User, createVehicleDto: CreateVehicleDto) {
    await this.validateRegistrationNumber(createVehicleDto);

    const newVehicle = await this.vehiclesRepository.create({
      ...createVehicleDto,
      userId: user,
    });

    await this.redisService.set(
      `${this.CACHE_KEY}${newVehicle._id}`,
      newVehicle,
    );

    return newVehicle;
  }

  async findAll() {
    return this.vehiclesRepository.find({});
  }

  async findOne(_id: string) {
    const cachedVehicle = await this.redisService.get(
      `${this.CACHE_KEY}${_id}`,
    );

    if (cachedVehicle) {
      return cachedVehicle;
    }

    const vehicle = await this.vehiclesRepository.findOne({ _id });

    if (vehicle) {
      await this.redisService.set(`${this.CACHE_KEY}${_id}`, vehicle);
    }

    return vehicle;
  }

  async update(_id: string, updateVehicleDto: UpdateVehicleDto) {
    const updatedVehicle = await this.vehiclesRepository.findOneAndUpdate(
      { _id },
      { $set: updateVehicleDto },
    );

    await this.redisService.set(`${this.CACHE_KEY}${_id}`, updatedVehicle);
    return updatedVehicle;
  }

  async remove(_id: string) {
    const deletedVehicle = await this.vehiclesRepository.findOneAndDelete({
      _id,
    });

    await this.redisService.del(`${this.CACHE_KEY}${_id}`);
    return deletedVehicle;
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
