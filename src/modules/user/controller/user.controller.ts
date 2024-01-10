import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import CreateUserDTO from '../dto/create-user.dto';
import UserDTO from '../dto/user.dto';
import UserService from '../service/user.service';
import { Public } from 'src/modules/auth/decorator/public.route';

@ApiTags('User')
@Controller('user')
@ApiInternalServerErrorResponse()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiOperation({
    description: 'get a list of users',
  })
  public async getList(): Promise<UserDTO[]> {
    return this.userService.getList();
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
  public async createUser(@Body() newUser: CreateUserDTO): Promise<string> {
    const createdUser = await this.userService.createUser(newUser);
    return createdUser.id;
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
