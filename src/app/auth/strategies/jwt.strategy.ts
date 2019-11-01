import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../auth.service';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from 'src/app/config/config.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor (private readonly authService: AuthService, private readonly configService: ConfigService) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			secretOrKey: configService.jwtSecret
		});
	}

	async validate (payload: JwtPayload) {
		const valid = await this.authService.validate(payload);

		if (!valid) {
			throw new UnauthorizedException();
		}

		return valid;
	}
}
