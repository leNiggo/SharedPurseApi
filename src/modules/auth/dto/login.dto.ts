import { IsEmail, IsHash } from 'class-validator';

export default class LoginDTO {
  /**
   * The users email address
   */
  @IsEmail()
  email: string;

  /**
   * The hashed password in sha256
   */
  @IsHash('sha256')
  password: string;
}
