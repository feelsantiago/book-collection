import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		DatabaseModule,
		LoggerModule,
		ConfigModule,

		// Api Modules
		AuthModule
	]
})
export class AppModule {}
