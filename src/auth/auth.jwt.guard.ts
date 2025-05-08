import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';

import { RedisService } from '../redis/redis.service';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { WINSTON_LOGGER_TOKEN } from '../logger/logger.module';
import { ChaPandaLogger } from '../logger/logger.service';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  @Inject(RedisService)
  private redisService: RedisService;
  @Inject(JwtService)
  private jwtService: JwtService;
  @Inject(WINSTON_LOGGER_TOKEN)
  private logger: ChaPandaLogger;

  async canActivate(context: ExecutionContext) {
    const req = context.switchToHttp().getRequest<Request>();
    const token: string = req.header('token') || '';
    const i18n = I18nContext.current()!;
    const lang = i18n.lang;
    // 空 token
    if (!token) {
      const message = i18n.t('common.auth.empty', { lang });
      throw new UnauthorizedException(message);
    }

    try {
      const { user }: { user: { id: string } } = this.jwtService.verify(token);
      // 登录过期
      const isExpired = await this.redisService.isExpiredKey(`user:${user.id}`);
      if (isExpired <= 0) {
        const message = i18n.t('common.auth.expired', { lang });
        throw new UnauthorizedException(message);
      }
    } catch (error) {
      // token 错误
      this.logger.error(error, JwtAuthGuard.name);
      const message = i18n.t('common.auth.error', { lang });
      throw new UnauthorizedException(message);
    }
    return true;
  }
}
