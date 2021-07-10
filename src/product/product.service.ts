import { Injectable } from '@nestjs/common';
import { Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

import { Product } from './interfaces/product.interface';
import { CreateProductDTO } from './dto/product.dto';

import * as bcrypt from 'bcrypt';

@Injectable()
export class ProductService {

  constructor(@InjectModel('Product') private readonly productModel: Model<Product>) { }

  async getProducts():Promise< Product[] > {
     const products=await this.productModel.find();
     return products;
  }

  async getProduct(productID: string):Promise<Product>   {
    const product=await this.productModel.findById(productID);
    return product;
  }

  async createProduct(createProductDTO:CreateProductDTO):Promise<Product> {
    const product = new this.productModel(createProductDTO);
    return await product.save();
  }  

  async deleteProduct(productID: string) : Promise<Product>{
    const deletedProduct = await this.productModel.findByIdAndRemove(productID);
    return deletedProduct;
  }

 async updateProduct(productID: string, createProductDTO: CreateProductDTO) : Promise<Product> {
    const updatedProduct= await this.productModel.findByIdAndUpdate(productID, createProductDTO, {new: true});
    return updatedProduct;
  }

/*Mongoose's findOneAndUpdate() long pre-dates the MongoDB driver's findOneAndUpdate() function, so it uses the MongoDB driver's 
findAndModify() function instead. You can opt in to using the MongoDB driver's findOneAndUpdate() function using the useFindAndModify global option.*/


  /*async crearContraseña( password){
    console.log(password);
    const newPassword= await this.encriptarContraseña(password)
    return newPassword;
  }
  
  async encriptarContraseña(password){
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  */



}



