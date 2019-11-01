import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { LoggerModule } from './logger/logger.module';
import { ConfigModule } from './config/config.module';

@Module({
	imports: [ DatabaseModule, LoggerModule, ConfigModule ]
})
export class AppModule {}
