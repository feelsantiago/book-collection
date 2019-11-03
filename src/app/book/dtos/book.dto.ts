import { IsString, IsArray, IsOptional } from 'class-validator';

export class BookDto {
	@IsString() name: string;

	@IsArray() authors: Array<String>;

	@IsString() year: string;

	@IsString() publish: string;

	@IsString() subjects: Array<string>;

	@IsString() type: string;

	@IsOptional() edition: number;

	@IsOptional() link: string;

	@IsOptional() library: string;
}
