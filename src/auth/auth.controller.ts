import { Controller, Post , Get, UseGuards, Req } from '@nestjs/common';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthGuard } from '@nestjs/passport';
import { LocalAuthGuard } from './local-auth.guards';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController { 

  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async comp(@Req() req:any) {
    return this.authService.login(req.user);
  
   // return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Req() req) {
    return req.user;
  }

  }


















