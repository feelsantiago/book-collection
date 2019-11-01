import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { RepositoryService } from '../database/repository.service';
import { UserCreateDto } from './dtos/user-create.dto';
import { User } from '../auth/decorators/user.decorator';
import { JwtUser } from '../auth/interfaces/jwt-user.interface';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SystemRoles } from '../auth/enum/system-roles.enum';

@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(SystemRoles.Admin, SystemRoles.Owner)
@Controller('user')
export class UserController {
	constructor (private readonly repositoryService: RepositoryService) {}

	@Post()
	async create (@Body() body: UserCreateDto, @User() user: JwtUser) {
		const newUser: any = { ...body };
		if (user.role === SystemRoles.Admin) {
			newUser.active = true;
			newUser.role = SystemRoles.Owner;
		} else {
			newUser.role = SystemRoles.User;
		}

		const result = await this.repositoryService.users.create(newUser);

		if (result.role === SystemRoles.User) {
			// TODO: send activation link
		}

		return result;
	}
}
