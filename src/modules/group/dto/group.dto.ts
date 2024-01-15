import { IsString, IsUUID } from 'class-validator';

export default class GroupDTO {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  createdByUser: string;
}
