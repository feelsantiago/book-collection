import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { ConfigModule } from '../config/config.module';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger/logger.module';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { RolesGuard } from './guards/roles.guard';
import { authProviders } from './auth.provider';

@Module({
	imports: [
		ConfigModule,
		DatabaseModule,
		LoggerModule,
		PassportModule.register({ defaultStrategy: 'jwt' }),
		JwtModule.register({
			secretOrPrivateKey: 'b00k$c0Lect1on$$',
			signOptions: {
				// expiresIn: 3600
			}
		})
	],
	providers: [ AuthService, JwtStrategy, JwtAuthGuard, RolesGuard, ...authProviders ],
	exports: [ AuthService, JwtAuthGuard, RolesGuard ]
})
export class AuthModule {}
