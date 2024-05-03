import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import { Produto } from '../../../entities/produtos/model/produtos.entity';
import { Categoria } from '../../../entities/categoria/model/categoria.entity';

export class DevService implements TypeOrmOptionsFactory {
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'db_farmacia_bem_estar',
      synchronize: true,
      entities: [Produto, Categoria],
    };
  }
}
