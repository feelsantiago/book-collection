import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { BookModule } from './book/book.module';

@Module({
	imports: [
		DatabaseModule,
		LoggerModule,
		ConfigModule,

		// Api Modules
		AuthModule,
		UserModule,
		BookModule
	]
})
export class AppModule {}
