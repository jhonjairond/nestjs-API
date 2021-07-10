import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';


@Module({
  imports: [ProductModule, MongooseModule.forRoot('mongodb+srv://admin:1234567890_@cluster0.foawe.mongodb.net/nestjs-API?retryWrites=true'), UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
