import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule, LoggerModule } from '@app/common';

@Module({
  imports: [DatabaseModule, LoggerModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
