import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { LoggerModule } from '../logger/logger.module';
import { BookController } from './book.controller';

@Module({
	imports: [ DatabaseModule, LoggerModule ],
	controllers: [ BookController ]
})
export class BookModule {}
