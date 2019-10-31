import { LoggerInstance } from 'winston';
import { Type } from '@nestjs/common';
import { ILoggerEntry } from '../interfaces/logger-entry.interface';
import { ILogger } from '../interfaces/logger.interface';

export class Logger<T> implements ILogger {
	constructor (private readonly logger: LoggerInstance, private readonly classType: Type<T>) {}

	log (level: string, error_id: string, ...msg: any): void {
		this.logger.log(level, `[${this.classType.name}] -`, `[Error_Id: ${error_id}] -`, ...msg);
	}

	debug (error_id: string, ...msg: any): void {
		this.logger.debug(`[${this.classType.name}] -`, ...msg);
	}

	info (error_id: string, ...msg: any): void {
		this.logger.info(`[${this.classType.name}] -`, ...msg);
	}

	warn (error_id: string, ...msg: any): void {
		this.logger.warn(`[${this.classType.name}] -`, ...msg);
	}

	error (error_id: string, ...msg: any): void {
		this.logger.error(`[${this.classType.name}] -`, ...msg);
	}
}
