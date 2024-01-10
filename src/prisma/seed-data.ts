import { User, UserRole } from '@prisma/client';

export const Users: User[] = [
  {
    id: '2e989d98-0db3-4aa4-b812-1127ce3bfc65',
    email: 'test@test.de',
    name: 'Tim Test',
    password:
      '54de7f606f2523cba8efac173fab42fb7f59d56ceff974c8fdb7342cf2cfe345',
    role: UserRole.ADMIN,
  },
];
