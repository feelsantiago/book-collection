import { Logger } from '../utils/logger';
import { Injectable, Inject } from '@nestjs/common';
import { LoggerInstance } from 'winston';
import { Type } from '@nestjs/common';
import { ILogger } from '../interfaces/logger.interface';

@Injectable()
export class LoggerService {
	constructor (@Inject('LoggerProvider') private readonly logger: LoggerInstance) {}

	createLogger<T> (classType: Type<T>): ILogger {
		return new Logger(this.logger, classType);
	}
}
