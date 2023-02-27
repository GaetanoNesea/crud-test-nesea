import {Injectable} from '@nestjs/common';
import {IUserModel} from './models/user.model';

@Injectable()
export class UsersService {
  private readonly users: IUserModel[] = [
    {
      id: 1,
      username: 'massimo',
      password: 'Massimo@nesea',
    },
    {
      id: 2,
      username: 'gaetano',
      password: 'Gaetano@nesea',
    },
    {
      id: 3,
      username: 'danilo',
      password: 'Danilo@nesea',
    },
  ];

  async findOne(username: string): Promise<IUserModel | undefined> {
    return this.users.find(({username: userName}) => userName === username);
  }
}
