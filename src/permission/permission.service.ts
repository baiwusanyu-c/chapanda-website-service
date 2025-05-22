import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreatePermissionDto } from './dto/create-permission.dto';
import { genResponse, StatusCode } from '../utils';
import { v4 as uuidv4 } from 'uuid';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Permission } from './entities/permission.entity';
import { SetUserPermissionDto } from './dto/set-user-permission.dto';
import { UserService } from '../user/user.service';
import { UserMenuPermissionDto } from './dto/user-menu-permission.dto';
import { ResUserMenuPermissionDto } from './dto/res-user-menu-permission.dto';
import { MenuService } from '../menu/menu.service';

@Injectable()
export class PermissionService {
  @InjectEntityManager()
  private manager: EntityManager;
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: ChaPandaLogger;
  @Inject()
  i18n: I18nService;
  @Inject(UserService)
  private userService: UserService;
  @Inject(MenuService)
  private menuService: MenuService;
  i18nGetter(key: string, operation?: string) {
    return this.i18n.t<string, string>(
      // 文案的 key
      key,
      {
        // 当前语言
        lang: I18nContext.current()!.lang,
        args: {
          operation,
        },
      },
    );
  }
  async create(createPermissionDto: CreatePermissionDto) {
    try {
      const uuid = uuidv4();
      const query = `
          START TRANSACTION; 
          INSERT INTO permission
          (id, type, name, path, method, menuId, createTime, updateTime)
          VALUES
          (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP(6), CURRENT_TIMESTAMP(6));
          COMMIT;`;

      await this.manager.query<any>(query, [
        uuid,
        createPermissionDto.type,
        createPermissionDto.name,
        createPermissionDto.path,
        createPermissionDto.method,
        createPermissionDto.menuId,
      ]);
      return genResponse<null>(
        StatusCode.OK,
        null,
        this.i18nGetter('permission.create.success'),
      );
    } catch (error) {
      this.logger.error(error, PermissionService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async findOne(id: string) {
    try {
      const query = `SELECT * FROM permission WHERE id = ?;`;
      const permissions = await this.manager.query<Permission[]>(query, [id]);
      return genResponse<Permission>(
        StatusCode.OK,
        permissions[0],
        this.i18nGetter('permission.find.success'),
      );
    } catch (error) {
      this.logger.error(error, PermissionService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }

  async setPermission(params: SetUserPermissionDto) {
    const { id, permissionId } = params;
    const { data: user } = await this.userService.findOne(id);
    const { data: permissions } = await this.findOne(permissionId);
    if (user && permissions) {
      try {
        const query = `
          START TRANSACTION; 
          INSERT INTO user_permission_relation
          (user_id, permission_id)
          VALUES
          (?, ?);
          COMMIT;`;
        await this.manager.query<Permission[]>(query, [id, permissionId]);
        return genResponse<null>(
          StatusCode.OK,
          null,
          this.i18nGetter('permission.assignment.success'),
        );
      } catch (error) {
        this.logger.error(error, PermissionService.name);
        return genResponse<null>(
          StatusCode.UnknownError,
          null,
          (error as ErrorEvent).message,
        );
      }
    } else {
      throw new HttpException(
        this.i18nGetter('permission.assignment.bad'),
        StatusCode.OK,
      );
    }
  }

  async userMenuPermission(params: UserMenuPermissionDto) {
    const { id, menuPath } = params;
    try {
      const { data: user } = await this.userService.findOne(id);
      const permissions = (user || { permissions: [] }).permissions;
      // 分配了权限，则根据路径，查出符合的菜单，对照 是否存在其id即可
      try {
        if (permissions && permissions.length > 0) {
          const permissionsStr = JSON.stringify(permissions);
          const menuRes = await this.menuService.findMenuByPath(menuPath);
          if (menuRes && menuRes.success) {
            const hasPermission = menuRes.res.some((m) => {
              return permissionsStr.includes(m.id);
            });
            if (!hasPermission) {
              throw new Error('unPermission');
            }
            return genResponse<ResUserMenuPermissionDto>(
              StatusCode.OK,
              {
                hasPermission,
              },
              this.i18nGetter('permission.menu.success'),
            );
          } else {
            throw new Error('unPermission');
          }
        } else {
          throw new Error('unPermission');
        }
      } catch (error) {
        console.log(error);
        return genResponse<ResUserMenuPermissionDto>(
          StatusCode.OK,
          {
            hasPermission: false,
          },
          this.i18nGetter('permission.menu.unPermission'),
        );
      }
    } catch (error) {
      this.logger.error(error, PermissionService.name);
      return genResponse<null>(
        StatusCode.UnknownError,
        null,
        (error as ErrorEvent).message,
      );
    }
  }
}
