import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { User } from '../user/entities/user.entity';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Menu } from './entities/menu.entity';

@Injectable()
export class MenuService {
  @InjectEntityManager()
  private manager: EntityManager;

  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: ChaPandaLogger;
  @Inject()
  i18n: I18nService;

  i18nGetter(key: string) {
    return this.i18n.t<string, string>(
      // 文案的 key
      key,
      {
        // 当前语言
        lang: I18nContext.current()!.lang,
      },
    );
  }

  async create(createMenuDto: CreateMenuDto) {
    const has = await this.findMenuByPath(createMenuDto.path);
    if (has && has.success) {
      throw new HttpException(this.i18nGetter('menu.exception.exist'), 200);
    }
    try {
      const query = `
          START TRANSACTION;
          SET @new_id = UUID();
          SET @menu_name = ?;
          SET @menu_icon = ?;
          SET @menu_path = ?;
          SET @menu_parent_id = ?;
          SET @new_order = (
            SELECT COALESCE(MAX(\`order\`), 0) + 1
            FROM menu
           WHERE parentId <=> 
            IF(@menu_parent_id IS NULL, 
              NULL, 
              CONVERT(@menu_parent_id USING utf8mb4) COLLATE utf8mb4_0900_ai_ci
            )
          );
          SET @menu_level = (
            SELECT COALESCE(MAX(\`level\`), 0) + 1
            FROM menu
            WHERE id <=> 
              IF(@menu_parent_id IS NULL, 
                NULL, 
                CONVERT(@menu_parent_id USING utf8mb4) COLLATE utf8mb4_0900_ai_ci
              )
          );
          INSERT INTO menu (id, name, icon, path, parentId, \`order\`, level)
          VALUES (
           @new_id,
           @menu_name,
           @menu_icon,
           @menu_path,
           @menu_parent_id,
           @new_order,
           @menu_level
          );
          
          -- 复制插入节点的祖先节点，比如
          -- A-B，在B中插入C，则从闭包表中找到
          -- 能够表述 B 的祖先节点的节点，集 ancestor = A descendant = B
          -- 此时深度是 1
          --  将其 ancestor 和 C 插入表中，得到 A 和 C 的关系 
          --  ancestor = A descendant = C，此时深度是 2，即 A-B-C 关系
          --  此时缺少描述 B-C，深度为1 的节点，我们需要继续添加
          --  这就是为什么使用 WHERE menu_closure.descendant = @menu_parent_id
          --  的原因，因为这样选取出来的节点是 A-B， B-B，这样可以直接得到
          --  A-C，深度为2，B-C深度为 1，来描述 A-B-C， B-C 关系
          --  SELECT id_ancestor, @new_id 相当于查询了 id_ancestor 和一个常量 @new_id
          INSERT INTO menu_closure (id_ancestor, id_descendant)
          SELECT 
           id_ancestor, @new_id
          FROM menu_closure WHERE menu_closure.id_descendant <=> 
            IF(@menu_parent_id IS NULL, 
              NULL, 
              CONVERT(@menu_parent_id USING utf8mb4) COLLATE utf8mb4_0900_ai_ci
            ) ;
          
          INSERT INTO menu_closure (id_ancestor, id_descendant)
          VALUES (@new_id, @new_id);
          COMMIT;
      `;
      await this.manager.query<User>(query, [
        createMenuDto.name,
        createMenuDto.icon,
        createMenuDto.path,
        createMenuDto.parentId || null,
      ]);
      return {
        success: true,
        message: this.i18nGetter('menu.create.success'),
      };
    } catch (error) {
      this.logger.error(error, MenuService.name);
      return {
        success: true,
        message: (error as ErrorEvent).message,
      };
    }
  }

  async findMenuByPath(path: string) {
    try {
      const query = `SELECT * FROM menu WHERE path = ?;`;
      const res = await this.manager.query<Menu[]>(query, [path]);
      return {
        success: res.length,
        res,
      };
    } catch (error) {
      this.logger.error(error, MenuService.name);
    }
  }

  async findTreeMenus() {
    try {
      const res = await this.manager.getTreeRepository(Menu).findTrees();
      return {
        success: true,
        res,
      };
    } catch (error) {
      this.logger.error(error, MenuService.name);
    }
  }
}
