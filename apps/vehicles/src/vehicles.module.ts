import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { DatabaseModule, LoggerModule } from '@app/common';
import { Vehicle, VehicleSchema } from './entities/vehicle.entity';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    LoggerModule,
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService],
})
export class VehiclesModule {}
