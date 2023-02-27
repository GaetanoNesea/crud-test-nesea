import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
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
    pass: string,
  ): Promise<{id: number; username: string} | null> {
    try {
      const {
        password = '',
        username = '',
        id = 0,
      } = await this.serviceUser.findOne(name);
      if (username && password && password === pass) {
        return {
          id,
          username,
        };
      }
    } catch (e) {
      throw new NotFoundException();
    }
    throw new UnauthorizedException();
  }

  async login(user: IUserModel) {
    const payload = {username: user.username, sub: user.id};
    return {
      access_token: this.jwtService.sign(payload),
      token: this.jwtService.sign(payload),
    };
  }

  async recuperaPass(password: string) {
    return {
      message: 'Password inviata alla email specificata',
    };
  }
}
