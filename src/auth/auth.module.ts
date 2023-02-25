import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {UsersService} from '../users/users.service';
import {PassportModule} from '@nestjs/passport';
import {LocalStrategy} from './local.strategy';

@Module({
  imports: [UsersModule, PassportModule],
  providers: [AuthService, UsersService, LocalStrategy],
})
export class AuthModule {}
