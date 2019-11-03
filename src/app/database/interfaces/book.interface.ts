import { Document } from 'mongoose';

export interface Book extends Document {
	readonly name: string;
	readonly authors: Array<String>;
	readonly year: string;
	readonly publish: string;
	readonly subjects: Array<string>;
	readonly type: string;
	readonly edition: number;
	readonly link: string;
	readonly library: string;
}
