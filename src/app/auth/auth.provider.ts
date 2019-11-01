import { Provider } from '@nestjs/common';
import { RepositoryService } from '../database/repository.service';
import { SystemRoles } from './enum/system-roles.enum';

export const authProviders: Array<Provider> = [
	{
		provide: 'SuperUserProvider',
		useFactory: async (repositoryService: RepositoryService) => {
			const found = await repositoryService.users.findOne({ email: 'super@user.com' });
			if (found) return found;

			const superUser = {
				email: 'super@user.com',
				name: 'superUser',
				password: 'super@man@91939',
				role: SystemRoles.Admin,
				active: true
			};

			const result = await repositoryService.users.create(superUser);
			return result;
		},
		inject: [ RepositoryService ]
	}
];
