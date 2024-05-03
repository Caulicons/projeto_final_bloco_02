import { Module } from '@nestjs/common';
import { Produto } from './model/produtos.entity';
import { CategoriaModule } from '../categoria/categoria.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoController } from './controllers/produto.controller';
import { ProdutoService } from './services/produto.service';
import { CategoriaService } from '../categoria/services/categoria.service';

@Module({
  imports: [TypeOrmModule.forFeature([Produto]), CategoriaModule],
  controllers: [ProdutoController],
  providers: [ProdutoService, CategoriaService],
  exports: [TypeOrmModule],
})
export class ProdutoModule {}
