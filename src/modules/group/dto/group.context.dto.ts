import { IsUUID } from 'class-validator';

export default class GroupContext {
  @IsUUID()
  id!: string;
}
