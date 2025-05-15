import { Module } from '@nestjs/common';
import { OperationCenterService } from './operation-center.service';
import { OperationCenterController } from './operation-center.controller';

@Module({
  controllers: [OperationCenterController],
  providers: [OperationCenterService],
})
export class OperationCenterModule {}
