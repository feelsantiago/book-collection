import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './interfaces/user.interface';
import { Book } from './interfaces/book.interface';

// Interfaces

@Injectable()
export class RepositoryService {
	constructor (
		@Inject('BookModel') private readonly bookModel: Model<Book>,
		@Inject('UserModel') private readonly userModel: Model<User>
	) {}

	get books (): Model<Book> {
		return this.bookModel;
	}

	get users (): Model<User> {
		return this.userModel;
	}
}
