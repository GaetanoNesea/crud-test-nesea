import {Injectable} from '@nestjs/common';
import {UsersService} from '../users/users.service';
import {JwtService} from '@nestjs/jwt';
import {IUserModel} from '../users/models/user.model';

@Injectable()
export class AuthService {
  constructor(
    private readonly serviceUser: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validaUser(
    name: string,
    password: string,
  ): Promise<{id: number; username: string} | null> {
    const {pass, username, id} = await this.serviceUser.findOne(name);
    if (username && pass === password) {
      return {
        id,
        username,
      };
    }
    return null;
  }

  async login(user: IUserModel) {
    const payload = {username: user.username, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
      token: this.jwtService.sign(payload),
    };
  }
}
