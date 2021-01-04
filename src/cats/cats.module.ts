import { Module, Global } from '@nestjs/common';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { UsersModule } from '../users/users.module';

@Global()
@Module({
  controllers: [CatsController],
  providers: [CatsService],
  exports: [CatsService, UsersModule],
  imports: [UsersModule],
})
export class CatsModule {
  //constructor(private catsService: CatsService) {}
}
