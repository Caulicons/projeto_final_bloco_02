import { InjectRepository } from '@nestjs/typeorm';
import { Categoria } from '../model/categoria.entity';
import { ILike, Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { CategoriaDTO } from '../dto/categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}
  // Gets --------------------------------------------------------
  async findAll(): Promise<Categoria[]> {
    return await this.categoriaRepository.find({
      relations: {
        produtos: true,
      },
    });
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
      relations: {
        produtos: true,
      },
    });

    if (!categoria)
      throw new HttpException(`Categoria ${id} não encontrada!`, 404);

    return categoria;
  }

  async findByName(name: string): Promise<Categoria> {
    const categorias = await this.categoriaRepository.findOne({
      where: { name: ILike(`%${name}%`) },
      relations: {
        produtos: true,
      },
    });

    if (!categorias)
      throw new HttpException(`Categoria ${name} não encontrada!`, 404);

    return categorias;
  }

  // Create --------------------------------------------------------
  async create(categoria: CategoriaDTO): Promise<Categoria> {
    const categoriaExiste = await this.categoriaRepository.findOne({
      where: { name: ILike(`%${categoria.name}%`) },
    });

    if (categoriaExiste)
      throw new HttpException(`Category ${categoria.name} already exist!`, 409);

    return await this.categoriaRepository.save(categoria);
  }

  // Update --------------------------------------------------------
  async update(id: number, categoria: CategoriaDTO): Promise<Categoria> {
    const categoriaExiste = await this.findById(id);

    if (!categoriaExiste)
      throw new HttpException(`Categoria ${id} não encontrada!`, 404);

    return await this.categoriaRepository.save({
      ...categoriaExiste,
      ...categoria,
    });
  }

  // Delete --------------------------------------------------------
  async delete(id: number): Promise<{ statusCode: number; message: string }> {
    const categoriaExiste = await this.findById(id);

    if (!categoriaExiste)
      throw new HttpException(`Categoria com ${id} não encontrada!`, 404);

    await this.categoriaRepository.remove(categoriaExiste);

    return {
      statusCode: 204,
      message: 'Post deleted successfully',
    };
  }
}
