import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiConflictResponse,
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import CreateUserDTO from '../dto/create-user.dto';
import UserDTO from '../dto/user.dto';
import UserService from '../service/user.service';
import { Public } from 'src/modules/auth/decorator/public.route';
import { JWT_AUTH } from 'src/constants/global';
import CreateUserResponseDTO from '../dto/create-user-response.dto';
import UserRequest from 'src/modules/auth/dto/user-request.dto';

@ApiTags('User')
@Controller('user')
@ApiBearerAuth(JWT_AUTH)
@ApiInternalServerErrorResponse()
@ApiConflictResponse()
@ApiBadRequestResponse()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    description: 'get a list of users',
  })
  public async getList(): Promise<UserDTO[]> {
    return this.userService.getList();
  }

  @Get('/me')
  @ApiOperation({
    description: 'get a me',
  })
  public async getMe(@Req() req: UserRequest): Promise<UserDTO> {
    return this.userService.getUser(req.user.userId);
  }

  @Get(':userId')
  @ApiOperation({
    description: 'get a single of users',
  })
  public async getOne(
    @Param('userId', ParseUUIDPipe) userId: string,
  ): Promise<UserDTO> {
    return this.userService.getUser(userId);
  }

  @Public()
  @Post()
  public async createUser(
    @Body() newUser: CreateUserDTO,
  ): Promise<CreateUserResponseDTO> {
    const createdUser = await this.userService.createUser(newUser);
    return { id: createdUser.id };
  }

  @Patch(':userId')
  public async updateUser(
    @Param('userId', ParseUUIDPipe) userId: string,
    @Body() newUser: CreateUserDTO,
  ): Promise<void> {
    await this.userService.update(userId, newUser);
  }

  @Delete(':userId')
  public async deleteUser(@Param('userId', ParseUUIDPipe) userId: string) {
    await this.userService.delete(userId);
  }
}
