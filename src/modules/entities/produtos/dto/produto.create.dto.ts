import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

export class CreateProdutoDTO {
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(75)
  nome: string;

  @IsNumber()
  preco: number;

  @IsNumber()
  quantidade: number;

  @IsNotEmpty()
  @IsNumber()
  categoriaId: number;
}
