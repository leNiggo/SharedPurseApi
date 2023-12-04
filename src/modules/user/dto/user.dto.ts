import { IsEmail, IsString, IsUUID } from 'class-validator';

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
}
