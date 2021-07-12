import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies';
import { JwtStrategy } from './jwt.strategy';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { MongooseModule } from '@nestjs/mongoose'; //importo modulo mongoose
import { UserSchema } from '../user/schemas/user.schema';


@Module({
  imports:[
    MongooseModule.forFeature([
      {name: 'User', schema: UserSchema}
      ]),
    PassportModule,
    UserModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '999990m' },
    }),
  ],
  controllers: [AuthController],
  exports: [AuthService, JwtModule],
  providers: [AuthService,LocalStrategy,JwtStrategy]
})
export class AuthModule {}
