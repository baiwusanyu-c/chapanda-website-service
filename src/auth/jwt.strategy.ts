import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { I18nService } from 'nestjs-i18n';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly i18n: I18nService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access,@typescript-eslint/no-unsafe-assignment
      jwtFromRequest: ExtractJwt.fromHeader('token'),
      ignoreExpiration: false,
      secretOrKey: 'chapanda',
    });
  }

  validate(payload: { user: User }) {
    return { id: payload.user.id, username: payload.user.username };
  }
}
