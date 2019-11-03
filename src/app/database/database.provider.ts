import * as mongoose from 'mongoose';
import { Connection } from 'mongoose';
import { ConfigService } from '../config/config.service';
import { User } from './interfaces/user.interface';
import { UserSchema } from './schemas/user.schema';
import { Book } from './interfaces/book.interface';
import { BookSchema } from './schemas/book.schema';

export const databaseProviders = [
	{
		provide: 'DbConnectionToken',
		useFactory: async (configService: ConfigService): Promise<typeof mongoose> => {
			const connection = await mongoose.connect(configService.database, {
				useNewUrlParser: true,
				useFindAndModify: false,
				useCreateIndex: true,
				useUnifiedTopology: true
			});
			return connection;
		},
		inject: [ ConfigService ]
	},
	{
		provide: 'BookModel',
		useFactory: (connection: Connection) => connection.model<Book>('book', BookSchema),
		inject: [ 'DbConnectionToken' ]
	},
	{
		provide: 'UserModel',
		useFactory: (connection: Connection) => connection.model<User>('users', UserSchema),
		inject: [ 'DbConnectionToken' ]
	}
];
