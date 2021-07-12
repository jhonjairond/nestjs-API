import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { User } from '../user/interfaces/user.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model} from 'mongoose';



@Injectable()
export class AuthService {

  constructor(
    private readonly userService:UserService,
    private jwtService: JwtService,
    @InjectModel('User') private readonly userModel: Model<User>) { }


  async validateUser(email:string, password:string):Promise<any> {
    const user = await this.userService.findOneByEmail(email);
    console.log(user);
    if (user && password === user.password) {
      return user;
    }
    return null;}


  async login(user: any) {
    const payload = { email: user.email, name: user.name };  //se crea el token
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
    
  async comprobarContraseña(password:string,hash:string){
    const isMatch = await bcrypt.compare(password, hash);   //verificar contraseña return true o false
    return isMatch;
  }
  //---------------------------------------------------------------------------------
  async findOneByEmail(email:string) {
    return await this.userModel.findOne({email});
  }


}
