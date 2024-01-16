import { PickType } from '@nestjs/swagger';
import GroupDTO from './group.dto';

export default class CreateGroupDTO extends PickType(GroupDTO, [
  'name',
  'userSaldo',
]) {}
