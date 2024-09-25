import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { AUTH_SERVICE, DatabaseModule, LoggerModule } from '@app/common';
import { Vehicle, VehicleSchema } from './entities/vehicle.entity';
import { VehiclesRepository } from './vehicles.repository';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
    DatabaseModule,
    DatabaseModule.forFeature([{ name: Vehicle.name, schema: VehicleSchema }]),
    LoggerModule,
    ClientsModule.registerAsync([
      {
        name: AUTH_SERVICE,
        useFactory: (configService: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: AUTH_SERVICE,
            port: configService.get('AUTH_TCP_PORT'),
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  controllers: [VehiclesController],
  providers: [VehiclesService, VehiclesRepository],
})
export class VehiclesModule {}
