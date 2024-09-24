import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable, Logger } from '@nestjs/common';
import { AbstractRepository } from '@app/common';
import { Vehicle } from './entities/vehicle.entity';

@Injectable()
export class VehiclesRepository extends AbstractRepository<Vehicle> {
  protected readonly logger = new Logger(VehiclesRepository.name);
  constructor(
    @InjectModel(Vehicle.name)
    protected readonly vehicleModel: Model<Vehicle>,
  ) {
    super(vehicleModel);
  }
}
