import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('tb_categorias')
export class CategoriaModel {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255, nullable: false })
  name: string;
}
