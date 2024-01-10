import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import LoginDTO from '../dto/login.dto';
import AuthService from '../service/auth.service';
import LoginResponseDTO from '../dto/login-response.dto';

@ApiTags('Login')
@Controller('login')
export default class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post()
  @ApiOkResponse({
    type: LoginResponseDTO,
  })
  public async signIn(@Body() fields: LoginDTO): Promise<LoginResponseDTO> {
    return this.authService.singIn(fields.email, fields.password);
  }
}
