import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {LocalAuthGuard} from './auth/local-auth.guard';
import {AuthService} from './auth/auth.service';
import {JwtAuthGuard} from './auth/jwt-auth.guard';
import {IUserModel} from './users/models/user.model';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    private authService: AuthService,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  async login(@Request() {user, ...req}: {user: IUserModel; req: Request}) {
    return this.authService.login({...user});
    //return req.user;
  }
}
