import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsHash, IsString, IsUUID } from 'class-validator';

export default class UserDTO {
  /**
   * The id of the user
   */
  @IsUUID()
  id: string;

  /**
   * The users name
   */
  @IsString()
  name: string;

  /**
   * The email address of the user
   * @example test@test.de
   */
  @IsEmail()
  email: string;

  /**
   * The hashed password
   * Example password is Test123!
   * @example 54de7f606f2523cba8efac173fab42fb7f59d56ceff974c8fdb7342cf2cfe345
   */
  @IsHash('sha256')
  password: string;

  @ApiProperty({
    enum: UserRole,
    description: 'the user role that will be applied',
    default: UserRole.CLIENT,
  })
  @IsEnum(UserRole)
  role?: UserRole;
}
