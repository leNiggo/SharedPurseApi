import { PartialType } from '@nestjs/swagger';
import CreateUserDTO from './create-user.dto';
import { IsHash } from 'class-validator';

export default class UpdateUserDTO extends PartialType(CreateUserDTO) {
  /**
   * The hashed password
   * Example password is Test123!
   * @example 54de7f606f2523cba8efac173fab42fb7f59d56ceff974c8fdb7342cf2cfe345
   */
  @IsHash('sha256')
  password: string;
}
