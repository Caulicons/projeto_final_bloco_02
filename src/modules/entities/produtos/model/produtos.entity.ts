import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from '../../categoria/model/categoria.entity';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, MaxLength, MinLength } from 'class-validator';

@Entity('tb_produtos')
export class Produto {
  @PrimaryGeneratedColumn()
  id: number;

  @Transform(({ value }) => value.toLowerCase().trim())
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(75)
  @Column({ unique: true, length: 255, nullable: false })
  nome: string;

  @IsNumber()
  @Column({ nullable: false })
  preco: number;

  @IsNumber()
  @Column({})
  quantidade: number;

  @ManyToOne(() => Categoria, (categoria) => categoria.produtos, {
    onDelete: 'CASCADE',
  })
  categoriaId: Categoria;
}
