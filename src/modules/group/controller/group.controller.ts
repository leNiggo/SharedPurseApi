import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JWT_AUTH } from 'src/constants/global';
import GroupService from '../service/group.service';
import UserRequest from 'src/modules/auth/dto/user-request.dto';
import CreateGroupDTO from '../dto/create-group.dto';

@ApiTags('Groups')
@Controller('group')
@ApiBearerAuth(JWT_AUTH)
@ApiInternalServerErrorResponse()
@ApiBadRequestResponse()
export default class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiOperation({
    description: 'this will create a group',
  })
  @ApiCreatedResponse({
    description: 'returns the created id of the group',
  })
  public async createGroup(
    @Req() req: UserRequest,
    @Body() fields: CreateGroupDTO,
  ): Promise<string> {
    const newGroup = await this.groupService.createGroup(
      req.user.userId,
      fields.name,
    );

    return newGroup.id;
  }

  @Get()
  @ApiOkResponse()
  public async getManyGroups(@Req() req: UserRequest) {}
}
