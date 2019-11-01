import { Controller, Body, Post, HttpCode, Get, BadRequestException } from '@nestjs/common';
import { ConfigService } from 'src/app/config/config.service';
import { RepositoryService } from 'src/app/database/repository.service';
import { LoggerService } from 'src/app/logger/services/logger.service';
import { AuthService } from './auth.service';
import { JwtUser } from './interfaces/jwt-user.interface';
import { JwtBroker } from './interfaces/jwt-broker.interface';
import { SystemRoles } from './enum/system-roles.enum';
import { UserLoginDto } from './dtos/user-login.dto';
import { ILogger } from '../logger/interfaces/logger.interface';

@Controller('api/v1/auth')
export class AuthController {
	private readonly logger: ILogger;

	constructor (
		private readonly authService: AuthService,
		private readonly repositoryService: RepositoryService,
		loggerService: LoggerService
	) {
		this.logger = loggerService.createLogger(AuthController);
	}

	@Post('token')
	@HttpCode(200)
	async userSignIn (@Body() info: UserLoginDto): Promise<any> {
		const user = await this.repositoryService.users.findOne({ email: info.email }).select('+password');

		if (!user) {
			this.logger.error(`User not found to email: ${info.email}`);
			throw new BadRequestException('Invalid e-mail or password.');
		}

		const result = await user.verifyPassword(info.password, user.password);

		if (!result) {
			this.logger.error(`Invalid password to email: ${info.email}`);
			throw new BadRequestException('Invalid e-mail or password.');
		}

		const payload: JwtUser = { id: user._id, email: user.email, name: user.name, role: SystemRoles.Admin };
		const token = await this.authService.signIn(payload);

		this.logger.info(`User Login by: ${info.email}`);
		return { user: payload, token: token };
	}
}
