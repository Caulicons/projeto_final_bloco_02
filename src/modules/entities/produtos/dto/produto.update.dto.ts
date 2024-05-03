import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';
import { Produto } from '../model/produtos.entity';
import { Categoria } from '../../categoria/model/categoria.entity';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateProdutoDTO extends PartialType(Produto) {
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(75)
  nome: string;

  @IsNumber()
  preco: number;

  @IsNumber()
  quantidade: number;

  categoriaId: Categoria;
}
