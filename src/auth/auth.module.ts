import {Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {UsersModule} from '../users/users.module';
import {UsersService} from '../users/users.service';

@Module({
  imports: [UsersModule],
  providers: [AuthService, UsersService],
})
export class AuthModule {}
