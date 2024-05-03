import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../model/categoria.entity';
import { CategoriaDTO } from '../dto/categoria.dto';

@Controller('/categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}
  // Get's ----------------------------------------------------------
  @Get()
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Categoria> {
    return await this.categoriaService.findById(id);
  }

  @Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<Categoria> {
    return await this.categoriaService.findByName(name);
  }

  // Post ----------------------------------------------------------
  @Post()
  async create(@Body() categoria: CategoriaDTO): Promise<Categoria> {
    return await this.categoriaService.create(categoria);
  }

  // Put ----------------------------------------------------------
  @Put(':id')
  async update(@Param('id') id: number, @Body() categoria: CategoriaDTO) {
    return await this.categoriaService.update(id, categoria);
  }

  // Delete --------------------------------------------------------
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.categoriaService.delete(id);
  }
}
