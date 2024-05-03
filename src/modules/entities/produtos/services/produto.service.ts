import { Injectable, HttpException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CreateProdutoDTO } from '../dto/produto.create.dto';
import { UpdateProdutoDTO } from '../dto/produto.update.dto';
import { Produto } from '../model/produtos.entity';
import { CategoriaService } from '../../categoria/services/categoria.service';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private produtoRepository: Repository<Produto>,
    private categoriaService: CategoriaService,
  ) {}
  // Gets --------------------------------------------------------
  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: {
        categoriaId: true,
      },
    });
  }

  async findById(id: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: {
        categoriaId: true,
      },
    });

    if (!produto) throw new HttpException(`Produto ${id} not found!`, 404);

    return produto;
  }

  async findByName(name: string): Promise<Produto> {
    const produtos = await this.produtoRepository.findOne({
      where: { nome: ILike(`%${name}%`) },
      relations: {
        categoriaId: true,
      },
    });

    if (!produtos) throw new HttpException(`Produto ${name} not found!`, 404);

    return produtos;
  }

  // Create --------------------------------------------------------
  async create(produto: CreateProdutoDTO): Promise<Produto> {
    const produtoExiste = await this.produtoRepository.findOne({
      where: { nome: ILike(`%${produto.nome}%`) },
    });

    const categoria = await this.categoriaService.findById(produto.categoriaId);

    if (!categoria.name)
      throw new HttpException(`Categoria ${categoria.id} not found!`, 404);

    if (produtoExiste)
      throw new HttpException(
        `Produto with name ${produto.nome} already exist!`,
        409,
      );

    return await this.produtoRepository.save({
      ...produto,
      categoriaId: categoria,
    });
  }

  // Update --------------------------------------------------------
  async update(id: number, produto: UpdateProdutoDTO): Promise<Produto> {
    const produtoExiste = await this.produtoRepository.findOne({
      where: { id },
    });

    if (!produtoExiste)
      throw new HttpException(`Produto ${id} not found!`, 404);

    const produtoNome = await this.produtoRepository.findOne({
      where: { nome: ILike(`%${produto.nome}%`) },
    });

    if (produtoNome)
      throw new HttpException(
        `Product with name ${produto.nome} already exist!`,
        409,
      );

    return await this.produtoRepository.save({
      ...produtoExiste,
      ...produto,
    });
  }

  // Delete --------------------------------------------------------
  async delete(id: number): Promise<{ statusCode: number; message: string }> {
    const produtoExiste = await this.produtoRepository.findOne({
      where: { id },
    });

    if (!produtoExiste)
      throw new HttpException(`Categoria com ${id} não encontrada!`, 404);

    await this.produtoRepository.remove(produtoExiste);

    return {
      statusCode: 204,
      message: 'Post deleted successfully',
    };
  }
}
