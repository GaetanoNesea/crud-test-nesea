import {IUserModel} from '../../users/models/user.model';
import {IsCurrency, IsEmail, IsString} from 'class-validator';

export class LoginAuthDto implements IUserModel {
  @IsEmail({})
  username: string;

  @IsString()
  @IsCurrency({require_symbol: true})
  password: string;
}
