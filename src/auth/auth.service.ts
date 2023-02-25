import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(private readonly serviceUser: UsersService) {}

  async validaUser(name: string, password: string): Promise<any> {
    const {pass, username, id} = await this.serviceUser.findOne(name);
    if (username && pass === password) {
      return {
        id,
        username,
      };
    }
    return null;
  }
}
