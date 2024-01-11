import { Module } from '@nestjs/common';
import PrismaModule from 'src/prisma/prisma.module';
import GroupService from './service/group.service';
import GroupController from './controller/group.controller';

@Module({
  imports: [PrismaModule],
  controllers: [GroupController],
  providers: [GroupService],
})
export default class GroupModule {}
