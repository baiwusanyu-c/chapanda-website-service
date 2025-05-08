import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { I18nContext } from 'nestjs-i18n';
import { TokenExpiredError, JsonWebTokenError } from 'jsonwebtoken';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest<User>(err: any, user: User, info: unknown) {
    const i18n = I18nContext.current()!;
    const lang = i18n.lang;
    // 错误类型分类
    if (info instanceof TokenExpiredError) {
      const message = i18n.t('common.auth.expired', { lang });
      throw new UnauthorizedException(message);
    }

    if (info instanceof JsonWebTokenError) {
      const message = i18n.t('common.auth.error', { lang });
      throw new UnauthorizedException(message);
    }

    if (err || !user) {
      const message = i18n.t('common.auth.empty', { lang });
      throw new UnauthorizedException(message);
    }

    return user;
  }
}
