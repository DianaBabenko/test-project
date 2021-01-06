import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  controllers: [UsersController],
  providers: [UsersService],
  //allow to import UsersService for different module
  exports: [UsersService],
})
export class UsersModule {}
