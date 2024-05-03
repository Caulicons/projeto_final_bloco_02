import { Module } from '@nestjs/common';
import { CategoriaController } from './controllers/categoria.controller';
import { CategoriaService } from './services/categoria.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriaModel } from './model/categoria.model';

@Module({
  imports: [TypeOrmModule.forFeature([CategoriaModel])],
  controllers: [CategoriaController],
  providers: [CategoriaService],
  exports: [TypeOrmModule],
})
export class CategoriaModule {}
