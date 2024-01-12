import { IsUUID } from 'class-validator';

export default class InviteUsersDTO {
  @IsUUID('4', { each: true })
  userIds: string[];
}
