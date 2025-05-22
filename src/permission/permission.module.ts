import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { UserService } from '../user/user.service';
import { MenuService } from '../menu/menu.service';

@Module({
  controllers: [PermissionController],
  providers: [PermissionService, UserService, MenuService],
})
export class PermissionModule {}
