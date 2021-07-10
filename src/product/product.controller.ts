import { Controller, Get,Post,Put,Delete,Res,Body,Param,HttpStatus,NotFoundException,Query } from '@nestjs/common';

import { CreateProductDTO } from './dto/product.dto';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {

constructor(private readonly productService: ProductService) { }

@Post('/create')
async createPost(@Res()res, @Body() createProductDTO: CreateProductDTO) {
  const product=await this.productService.createProduct(createProductDTO);
  return res.status(HttpStatus.OK).json({ //json {} sobre todo si voy a mandar mensaje
    product:product  //redundante
  });
} 

@Get('/')
async getProducts(@Res()res) {
  const products=await this.productService.getProducts();
  res.status(HttpStatus.OK).json(products);
}

@Get('/:productID')
async getProduct(@Res()res , @Param('productID') productID) {
  const product=await this.productService.getProduct(productID);
  if(!product) throw new NotFoundException('producto no existe');
  return res.status(HttpStatus.OK).json(product);
}

@Delete('/:productID')
async deleteProduct(@Res()res , @Param('productID') productID) {
  const product=await this.productService.deleteProduct(productID);
  if(!product) throw new NotFoundException('producto no existe');
  return res.status(HttpStatus.OK).json(product);
}

@Put('/:productID') //tambien se puede hacer con query
async updateProduct(@Res()res , @Param('productID') productID, @Body() createProductDTO: CreateProductDTO) {
  const product=await this.productService.updateProduct(productID,createProductDTO);
  if(!product) throw new NotFoundException('producto no existe');
  return res.status(HttpStatus.OK).json(product);
}

/*//eliminar con consulta
@Delete('/')
async deleteProduct(@Res()res , @Query('productID') productID) {
  const product=await this.productService.deleteProduct(productID);
  if(!product) throw new NotFoundException('producto no existe');
  return res.status(HttpStatus.OK).json(product);
}*/
//localhost/30000/product/product?productID=1234567865







}

/*
  @Post('/create')
  async createPost(@Res()res, @Body() createProductDTO:any) {
    console.log(createProductDTO);
    const newPassword=await this.productService.crearContraseña(createProductDTO.password);

    console.log(createProductDTO.password,newPassword);
    return res.status(HttpStatus.OK).json({
      message:'received', newPassword
    });
  }  */