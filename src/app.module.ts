import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from './config/config.module';
import { DoctorModule } from './doctor/doctor.module';

@Module({
  imports: [ConfigModule, DoctorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
