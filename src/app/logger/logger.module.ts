import { Module } from '@nestjs/common';
import { loggerProviders } from './logger.provider';
import { AppLoggerService } from './services/app-logger.service';
import { LoggerService } from './services/logger.service';
import { ConfigModule } from '../config/config.module';

@Module({
	imports: [ ConfigModule ],
	providers: [ ...loggerProviders, AppLoggerService, LoggerService ],
	exports: [ ...loggerProviders, AppLoggerService, LoggerService ]
})
export class LoggerModule {}
