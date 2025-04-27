import { Controller, Get, HttpStatus } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // 定义接口描述
  @ApiOperation({ summary: '密码登录', description: '密码登录接口' })
  // 定义接口返回
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'aaa 成功',
    type: String,
  })
  // 定义参数
  // @ApiBody({
  //   type: LoginUserDto,
  // })
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
