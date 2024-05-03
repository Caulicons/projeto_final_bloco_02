import { InjectRepository } from '@nestjs/typeorm';
import { CategoriaModel } from '../model/categoria.model';
import { ILike, Repository } from 'typeorm';
import { HttpException, Injectable } from '@nestjs/common';
import { CategoriaDTO } from '../dto/categoria.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(CategoriaModel)
    private readonly categoriaRepository: Repository<CategoriaModel>,
  ) {}
  // Gets --------------------------------------------------------
  async findAll(): Promise<CategoriaModel[]> {
    return await this.categoriaRepository.find();
  }

  async findById(id: number): Promise<CategoriaModel> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id },
    });

    if (!categoria)
      throw new HttpException(`Categoria ${id} não encontrada!`, 404);

    return categoria;
  }

  async findByName(name: string): Promise<CategoriaModel> {
    const categorias = await this.categoriaRepository.findOne({
      where: { name: ILike(`%${name}%`) },
    });

    if (!categorias)
      throw new HttpException(`Categoria ${name} não encontrada!`, 404);

    return categorias;
  }

  // Create --------------------------------------------------------
  async create(categoria: CategoriaDTO): Promise<CategoriaModel> {
    const categoriaExiste = await this.categoriaRepository.findOne({
      where: { name: ILike(`%${categoria.name}%`) },
    });

    if (categoriaExiste)
      throw new HttpException(`Category ${categoria.name} already exist!`, 409);

    return await this.categoriaRepository.save(categoria);
  }

  // Update --------------------------------------------------------
  async update(id: number, categoria: CategoriaDTO): Promise<CategoriaModel> {
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
