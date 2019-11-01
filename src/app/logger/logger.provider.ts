import * as winston from 'winston';
import * as fs from 'fs';
import * as path from 'path';
import 'winston-daily-rotate-file';
import { Provider } from '@nestjs/common';

export const loggerProviders: Array<Provider> = [
	{
		provide: 'LoggerProvider',
		useFactory: () => {
			const loggerPath = '../../logs';
			let result = fs.existsSync(path.join(__dirname, loggerPath));

			if (!result) fs.mkdirSync(path.join(__dirname, loggerPath));

			const logger = new winston.Logger({
				transports: [
					new winston.transports.DailyRotateFile({
						level: 'info',
						filename: '.log',
						dirname: path.join(__dirname, loggerPath),
						datePattern: 'yyyy-MM-dd',
						prepend: true,
						handleExceptions: true,
						json: false,
						colorize: false
					}),
					new winston.transports.Console({
						level: 'debug',
						handleExceptions: true,
						json: false,
						colorize: true
					})
				],
				exitOnError: false
			});

			return logger;
		}
	},
	{
		provide: 'LoggerStreamProvider',
		useFactory: (logger: winston.LoggerInstance) => {
			return {
				write: function (msg, encoding) {
					return logger.info(msg);
				}
			};
		},
		inject: [ 'LoggerProvider' ]
	}
];
