import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Produto } from '../../produtos/model/produtos.entity';

@Entity('tb_categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true, length: 255, nullable: false })
  name: string;

  @OneToMany(() => Produto, (produtos) => produtos.categoriaId)
  produtos: Produto[];
}
