import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
} from '@nestjs/common';
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
import { GroupListDTO } from '../dto/list-group.dto';
import { mapToGroupListDTO } from '../mapper/list-group.mapper';
import InviteUsersDTO from '../dto/invite-user.dto';
import GroupContext from '../dto/group.context.dto';

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
  public async getManyGroups(@Req() req: UserRequest): Promise<GroupListDTO> {
    const groups = await this.groupService.getGroupsByUser(req.user.userId);

    return {
      groups: groups.map(mapToGroupListDTO),
    };
  }

  @Patch('invite/:id')
  @ApiOkResponse()
  public async inviteUser(
    @Param() context: GroupContext,
    @Body() fields: InviteUsersDTO,
  ): Promise<void> {
    await this.groupService.inviteUser(context.id, fields.userIds);
  }

  @Patch('remove/:id')
  public async removeUser(
    @Param() context: GroupContext,
    @Body() fields: InviteUsersDTO,
  ): Promise<void> {
    await this.groupService.removeUser(context.id, fields.userIds);
  }

  @Delete(':id')
  @ApiOkResponse()
  public async deleteGroup(
    @Req() req: UserRequest,
    @Param() context: GroupContext,
  ) {
    await this.groupService.deleteGroup(req.user.userId, context.id);
  }
}
