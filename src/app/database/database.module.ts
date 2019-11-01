import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { databaseProviders } from './database.provider';
import { RepositoryService } from './repository.service';

@Module({
	imports: [ ConfigModule ],
	providers: [ ...databaseProviders, RepositoryService ],
	exports: [ ...databaseProviders, RepositoryService ],
})
export class DatabaseModule {}
