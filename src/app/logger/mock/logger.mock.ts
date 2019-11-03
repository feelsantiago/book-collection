import { ILogger } from '../interfaces/logger.interface';

export class LoggerMock implements ILogger {
	log (level: string, error_id: string, ...msg: any): void {}
	debug (error_id: string, ...msg: any): void {}
	info (error_id: string, ...msg: any): void {}
	warn (error_id: string, ...msg: any): void {}
	error (error_id: string, ...msg: any): void {}
}
