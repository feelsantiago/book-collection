import { Logger, Injectable, Inject } from '@nestjs/common';
import { LoggerInstance } from 'winston';

/**
 * This class add winston in the middle of native nest logger
 */
@Injectable()
export class AppLoggerService extends Logger {
	constructor (@Inject('LoggerProvider') private readonly logger: LoggerInstance) {
		super();
	}

	error (message: string, trace: string) {
		// this.logger.error(message);
		this.logger.error(trace);

		// super.error(message, trace);
	}

	log (message: string) {
		this.logger.log('info', message);

		// super.log(message);
	}

	warn (message: string) {
		this.logger.warn(message);

		// super.warn(message);
	}
}
