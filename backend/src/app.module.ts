import { Module } from '@nestjs/common';
import { HealthController } from './health.controller';
import { StatusController } from './status.controller';

@Module({
  imports: [],
  controllers: [HealthController, StatusController],
  providers: [],
})
export class AppModule {}
