import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

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
      autoLoadEntities: true,
    };
  }
}
