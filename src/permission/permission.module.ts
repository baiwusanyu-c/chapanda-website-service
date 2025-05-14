import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { UserService } from '../user/user.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, UserService],
})
export class PermissionModule {}
