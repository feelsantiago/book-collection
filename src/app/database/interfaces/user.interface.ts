import { Document } from 'mongoose';

export interface User extends Document {
	name: string;
	email: string;
	role: string;
	password: string;
	active: boolean;
	createdAt: Date;
	updatedAt: Date;

	verifyPassword(password: string, hash: string): Promise<boolean>;
}
