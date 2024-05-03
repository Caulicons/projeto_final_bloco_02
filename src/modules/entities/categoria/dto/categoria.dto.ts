import { Transform } from 'class-transformer';
import { IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class CategoriaDTO {
  @Transform(({ value }) => value.toLowerCase().trim())
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(75)
  name: string;
}
