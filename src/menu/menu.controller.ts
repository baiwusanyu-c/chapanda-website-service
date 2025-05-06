import { Controller, Post, Body } from '@nestjs/common';
import { MenuService } from './menu.service';
import { CreateMenuDto } from './dto/create-menu.dto';

@Controller('menu')
export class MenuController {
  constructor(private readonly menuService: MenuService) {}

  // 创建菜单
  @Post('add')
  create(@Body() createMenuDto: CreateMenuDto) {
    return this.menuService.create(createMenuDto);
  }
  // 获取完整菜单树
  @Post('getTreeMenus')
  findTreeMenus() {
    return this.menuService.findTreeMenus();
  }
}
