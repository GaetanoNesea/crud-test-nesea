import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {UsersService} from '../users/users.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';
import {JwtModule} from '@nestjs/jwt';
import {jwtConstant} from './constant';

@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstant.secret,
      signOptions: {expiresIn: '1 days'},
    }),
  ],
  providers: [AuthService, UsersService, LocalStrategy],
  exports: [AuthService]
})
export class AuthModule {}
