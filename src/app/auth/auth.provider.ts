import { Provider } from '@nestjs/common';
import { RepositoryService } from '../database/repository.service';
import { UserRegisterDto } from './dtos/user-register.dto';

export const authProviders: Array<Provider> = [
	{
		provide: 'SuperUserProvider',
		useFactory: async (repositoryService: RepositoryService) => {
			const found = await repositoryService.users.find({ email: 'super@user.com' });
			if (found) return found;

			const superUser: UserRegisterDto = {
				email: 'super@user.com',
				name: 'superUser',
				password: 'super@man@91939'
			};

			return await repositoryService.users.create(superUser);
		},
		inject: [ RepositoryService ]
	}
];
