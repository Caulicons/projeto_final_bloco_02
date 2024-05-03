import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DevService } from './dbConnection/services/dev.service';

@Module({
  imports: [
    // To load environment variables from .env file in the future
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DevService,
      imports: [ConfigModule],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
