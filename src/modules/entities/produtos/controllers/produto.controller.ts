import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProdutoService } from '../services/produto.service';
import { Produto } from '../model/produtos.entity';
import { CreateProdutoDTO } from '../dto/produto.create.dto';
import { UpdateProdutoDTO } from '../dto/produto.update.dto';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}
  // Get's ----------------------------------------------------------
  @Get()
  async findAll(): Promise<Produto[]> {
    return await this.produtoService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Produto> {
    return await this.produtoService.findById(id);
  }

  @Get('/name/:name')
  async findByName(@Param('name') name: string): Promise<Produto> {
    return await this.produtoService.findByName(name);
  }

  // Post ----------------------------------------------------------
  @Post()
  async create(@Body() categoria: CreateProdutoDTO): Promise<Produto> {
    return await this.produtoService.create(categoria);
  }

  // Put ----------------------------------------------------------
  @Put(':id')
  async update(@Param('id') id: number, @Body() categoria: UpdateProdutoDTO) {
    return await this.produtoService.update(id, categoria);
  }

  // Delete --------------------------------------------------------
  @Delete(':id')
  async delete(@Param('id') id: number) {
    return await this.produtoService.delete(id);
  }
}
