import { Controller, Get,Post,Put,Delete,Res,Body,Param,HttpStatus,NotFoundException,Query,Req } from '@nestjs/common';

import { CreateUserDTO } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

  constructor(private readonly userService: UserService) { }

  @Post('/create')                             //crear usuario 
  async createPost(@Res()res, @Body() createUserDTO: CreateUserDTO) {
    const nuevaCon=await this.userService.crearContraseña(createUserDTO.password) // invoco la funcion crearContraseña que toma el campo password de CreateUserDTO 
    createUserDTO.password=nuevaCon;
    const user=await this.userService.createUser(createUserDTO);
    return res.status(HttpStatus.OK).json({ //json {} sobre todo si voy a mandar mensaje
      user:user  //redundante
    });
  } 
  
  @Post('/signin')                              //sign in
  async userLogIn(@Res()res, @Body() {name,password}) {
    console.log(name);
    console.log(password);
    const user=await this.userService.userLogIn(name,password);
    console.log(user);
    res.status(HttpStatus.OK).json(user);
    
  }

  @Get('/')                                               //usuarios
  async getUsers(@Res()res) {
    const users=await this.userService.getUsers();
    res.status(HttpStatus.OK).json(users);
  }
  
  @Get('/:userID')                                        //usuario por id                            
  async getUser(@Res()res , @Param('userID') userID) {
    const user=await this.userService.getUser(userID);
    if(!user) throw new NotFoundException('usuario no existe');
    return res.status(HttpStatus.OK).json(user);
  }
  
  @Delete('/:userID')                                     //borrar usuario por id
  async deleteUser(@Res()res , @Param('userID') userID) {
    const user=await this.userService.deleteUser(userID);
    if(!user) throw new NotFoundException('usuario no existe');
    return res.status(HttpStatus.OK).json(user);
  }
  
  @Put('/:userID') //tambien se puede hacer con query             //editar usuario por id
  async updateUser(@Res()res , @Param('userID') userID, @Body() createUserDTO: CreateUserDTO) {
    const user=await this.userService.updateUser(userID,createUserDTO);
    if(!user) throw new NotFoundException('Usuario no existe');
    return res.status(HttpStatus.OK).json(user);
  }
  
  /*//eliminar con consulta
  @Delete('/')
  async deleteProduct(@Res()res , @Query('productID') productID) {
    const product=await this.productService.deleteProduct(productID);
    if(!product) throw new NotFoundException('producto no existe');
    return res.status(HttpStatus.OK).json(product);
  }*/
  //localhost/30000/product/product?productID=1234567865
  
  /*
    @Post('/create')
    async createPost(@Res()res, @Body() createProductDTO:any) {
      console.log(createProductDTO);
      const newPassword=await this.productService.crearContraseña(createProductDTO.password);
  
      console.log(createProductDTO.password,newPassword);
      return res.status(HttpStatus.OK).json({
        message:'received', newPassword
      });*/

}
