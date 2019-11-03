import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import * as helmet from 'helmet';
import * as morgan from 'morgan';
import * as cors from 'cors';

import { AppModule } from './app/app.module';
import { AppLoggerService } from './app/logger/services/app-logger.service';

async function bootstrap () {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix('api/v1');

	const logger = app.get(AppLoggerService);

	// middleware
	app.use(cors());
	app.use(helmet());
	app.useLogger(logger);
	app.use(morgan('combined', { stream: app.get('LoggerStreamProvider') }));

	app.useGlobalPipes(
		new ValidationPipe({
			forbidUnknownValues: true,
			validationError: { target: false, value: true }
		})
	);

	await app.listen(3000);
}
bootstrap();
