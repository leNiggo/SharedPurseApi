export default class UserRequest extends Request {
  user: UserRequestDTO;
}

class UserRequestDTO {
  userId: string;

  userName: string;

  iat: number;

  exp: number;
}
