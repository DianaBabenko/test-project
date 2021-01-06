import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { UsersModule } from '../users/users.module';
import { CommonModule } from '../common/common.module';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService, UsersModule],
  //making UsersModule's exported providers available inside CatsModule
  imports: [UsersModule, CommonModule],
})
export class CatsModule {
  //constructor(private catsService: CatsService) {}
}
