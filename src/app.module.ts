import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DevService } from './modules/db/connection/services/dev.service';
import { CategoriaModule } from './modules/entities/categoria/categoria.module';
import { ProdutoModule } from './modules/entities/produtos/produto.module';

@Module({
  imports: [
    // To load environment variables from .env file in the future
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DevService,
      imports: [ConfigModule],
    }),
    CategoriaModule,
    ProdutoModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
