import { HttpException, Inject, Injectable } from '@nestjs/common';
import { CreateMenuDto } from './dto/create-menu.dto';
import { UpdateMenuDto } from './dto/update-menu.dto';
import { User } from '../user/entities/user.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { EntityManager, Repository } from 'typeorm';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';
import { I18nContext, I18nService } from 'nestjs-i18n';
import { Menu } from './entities/menu.entity';
import { v4 as uuidv4 } from 'uuid';

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
      const uuid = uuidv4();
     /* const query = `
        -- 开启事务（确保原子性）
        START TRANSACTION;
        -- 步骤 1：生成 UUID（假设数据库支持 UUID() 函数）
        SET @new_id = UUID();
        -- 步骤 2：动态计算 order 值（避免触发器依赖）
        SET @parent_id = ?;
        SET @menu_name = ?;
        SET @menu_icon = ?;
        SET @menu_path = ?;
        SET @new_order = (
          SELECT COALESCE(MAX(\`order\`), 0) + 1
          FROM \`chapanda-website-database\`.menu
          WHERE parentId = @parent_id
        );

        -- 步骤 3：插入主表数据
        INSERT INTO \`chapanda-website-database\`.menu  (id, name, icon, path, parentId, \`order\`)
        VALUES (
          @new_id,
          @menu_name,        -- 名称
          @menu_icon,        -- 图标
          @menu_path,        -- 路径
          @parent_id,        -- 父节点ID
          @new_order         -- 自动计算的排序值
        );

        -- 步骤 4：维护闭包表
        -- 4.1 插入节点自身（深度0）
        INSERT INTO \`chapanda-website-database\`.menu_closure (id_ancestor, id_descendant)
        VALUES (@new_id, @new_id);

        -- 4.2 如果有父节点，继承其祖先关系
        INSERT INTO \`chapanda-website-database\`.menu_closure (id_ancestor, id_descendant)
        SELECT
         id_ancestor,
         @new_id
        FROM \`chapanda-website-database\`.menu_closure
        WHERE id_descendant = @parent_id
        AND @parent_id IS NOT NULL;

        -- 提交事务
        COMMIT;
      `;*/

      await this.manager.query(
        `
         INSERT INTO menu (id, name, icon, path, parentId, \`order\`)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [
          uuid,
          createMenuDto.name,
          createMenuDto.icon || null,
          createMenuDto.path,
          createMenuDto.parentId || null,
          0,
        ],
      );

      // 3. 处理闭包表关系
      if (createMenuDto.parentId) {
        // 复制父级所有祖先关系，depth +1
        await this.manager.query(
          `INSERT INTO menu_closure (id_ancestor, id_descendant)
           SELECT id_ancestor, ? 
           FROM menu_closure
           WHERE id_descendant = ?`,
          [uuid, createMenuDto.parentId],
        );
      }

      // 插入自身关系（depth=0）
      await this.manager.query(
        `INSERT INTO menu_closure (id_ancestor, id_descendant)
         VALUES (?, ?)`,
        [uuid, uuid],
      );

      /*await this.manager.query<User>(query, [
        createMenuDto.parentId,
        createMenuDto.name,
        createMenuDto.icon,
        createMenuDto.path,

      ]);*/

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
      const query = `SELECT * FROM \`chapanda-website-database\`.menu WHERE path = ?;`;
      const res = await this.manager.query<Menu[]>(query, [path]);
      return {
        success: res.length,
        res,
      };
    } catch (error) {
      this.logger.error(error, MenuService.name);
    }
  }

  findAll() {
    return `This action returns all menu`;
  }

  findOne(id: number) {
    return `This action returns a #${id} menu`;
  }

  update(id: number, updateMenuDto: UpdateMenuDto) {
    return `This action updates a #${id} menu`;
  }

  remove(id: number) {
    return `This action removes a #${id} menu`;
  }
}
