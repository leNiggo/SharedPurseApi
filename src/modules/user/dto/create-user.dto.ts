import { OmitType } from '@nestjs/swagger';
import UserDTO from './user.dto';
import { IsHash } from 'class-validator';

export default class CreateUserDTO extends OmitType(UserDTO, ['id']) {
  /**
   * The hashed password
   * Example password is Test123!
   * @example 54de7f606f2523cba8efac173fab42fb7f59d56ceff974c8fdb7342cf2cfe345
   */
  @IsHash('sha256')
  password: string;
}
