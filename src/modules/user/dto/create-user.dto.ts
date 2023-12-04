import { OmitType } from '@nestjs/swagger';
import UserDTO from './user.dto';

export default class CreateUserDTO extends OmitType(UserDTO, ['id']) {}
