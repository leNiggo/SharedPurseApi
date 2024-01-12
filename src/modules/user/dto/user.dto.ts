import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '@prisma/client';
import { IsEmail, IsEnum, IsString, IsUUID } from 'class-validator';

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

  @ApiProperty({
    enum: UserRole,
    description: 'the user role that will be applied',
    default: UserRole.CLIENT,
  })
  @IsEnum(UserRole)
  role?: UserRole;
}
