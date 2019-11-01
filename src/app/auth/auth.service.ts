import { JwtService } from '@nestjs/jwt';
import { Injectable } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { SystemRoles } from './enum/system-roles.enum';
import { JwtUser } from './interfaces/jwt-user.interface';
import { JwtBroker } from './interfaces/jwt-broker.interface';
import { JwtClient } from './interfaces/jwt-client.interface';
import { RepositoryService } from '../database/repository.service';

@Injectable()
export class AuthService {
	constructor (private readonly repositoryService: RepositoryService, private readonly jwtService: JwtService) {}

	async signIn (payload: JwtPayload): Promise<string> {
		return this.jwtService.sign(payload);
	}

	async validate (payload: JwtPayload): Promise<any> {
		const user = await this.repositoryService.users.findById(payload.id);
		return user ? payload : null;
	}
}
