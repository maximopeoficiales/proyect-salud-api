import { Module } from '@nestjs/common';
import { DoctorService } from './doctor.service';
import { DoctorController } from './doctor.controller';
import { ConfigModule } from 'src/config/config.module';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [ConfigModule, HttpModule.register({
    baseURL: process.env.URL_CMP,
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    timeout: 5000,
    maxRedirects: 5,
  })],
  controllers: [DoctorController],
  providers: [DoctorService]
})
export class DoctorModule { }
