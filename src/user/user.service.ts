import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';
import { User } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/user.dto';
import * as bcrypt from 'bcrypt';


@Injectable()
export class UserService {

  constructor(@InjectModel('User') private readonly userModel: Model<User>) { }

  async getUsers():Promise< User[] > {                   //encontrar todos los usuarios
     const users=await this.userModel.find();
     return users;
  }

  async getUser(userID: string):Promise<User>   {           //encontrar un usuario
    const user=await this.userModel.findById(userID);
    return user;
  }

  async createUser(createUserDTO:CreateUserDTO):Promise<User> {  //sign up
    const user =new this.userModel(createUserDTO);
    return await user.save();
  }  

  async deleteUser(userID: string) : Promise<User>{              //borrar un usuario
    const deletedUser = await this.userModel.findByIdAndRemove(userID);
    return deletedUser;
  }

 async updateUser(userID: string, createUserDTO: CreateUserDTO) : Promise<User> {             //actualizar un usuario
    const updatedUser= await this.userModel.findByIdAndUpdate(userID, createUserDTO, {new: true});
    return updatedUser;
  }

  async userLogIn(name,password):Promise<User>   {                         //sign in            
    const user=await this.userModel.findOne({$text: {$search: name}});
    const hash=user.password;
    const pass=password;
    console.log(hash);
    const valido=await this.comprobarContraseña(pass,hash);
    console.log(valido);
    if(!valido){console.log('el usuario introdujo contraseña incorrecta')}
      else{ console.log('el usuario introdujo contraseña correcta')}
    return user;
  }
  
/*Mongoose's findOneAndUpdate() long pre-dates the MongoDB driver's findOneAndUpdate() function, so it uses the MongoDB driver's 
findAndModify() function instead. You can opt in to using the MongoDB driver's findOneAndUpdate() function using the useFindAndModify global option.*/

//----------------------------------------------------------------------------funciones de ayuda------------------------------------------------------------------------------------------

  async encriptarContraseña(password:string){
    const hash = await bcrypt.hash(password, 10);
    return hash;
  }
  
  async crearContraseña(password:string){
    const newPassword= await this.encriptarContraseña(password)
    return newPassword;
  }
  
  async comprobarContraseña(password:string,hash:string){
    const isMatch = await bcrypt.compare(password, hash);   //verificar contraseña return true o false
    return isMatch;
  }
  
  

}
