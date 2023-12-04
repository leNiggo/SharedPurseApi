import { PartialType } from '@nestjs/swagger';
import CreateUserDTO from './create-user.dto';

export default class UpdateUserDTO extends PartialType(CreateUserDTO) {}
