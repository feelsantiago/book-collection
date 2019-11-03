import { Controller, Get, Post, Put, Delete, Param, UseGuards, Body } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { SystemRoles } from '../auth/enum/system-roles.enum';
import { BookDto } from './dtos/book.dto';
import { RepositoryService } from '../database/repository.service';

@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('book')
export class BookController {
	constructor (private readonly repositoryService: RepositoryService) {}

	@Get(':id')
	async get (@Param('id') id: string) {
		return this.repositoryService.books.findById(id);
	}

	@Get()
	async getAll () {
		return this.repositoryService.books.find();
	}

	@Roles(SystemRoles.Admin, SystemRoles.Owner)
	@Post()
	async create (@Body() body: BookDto) {
		return this.repositoryService.books.create(body);
	}

	@Roles(SystemRoles.Admin, SystemRoles.Owner)
	@Put(':id')
	async update (@Body() body: BookDto, @Param('id') id: string) {
		return this.repositoryService.books.findByIdAndUpdate(id, body);
	}

	@Roles(SystemRoles.Admin, SystemRoles.Owner)
	@Delete(':id')
	async delete (@Param('id') id: string) {
		return await this.repositoryService.books.findOneAndDelete({ _id: id });
	}
}
