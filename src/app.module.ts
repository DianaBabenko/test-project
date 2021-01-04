import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { UsersModule } from './users/users.module';
import { HttpService } from './http/http.service';
import { CatsModule } from './cats/cats.module';
//mport { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './cats/cats.controller';
import { logger } from './logger.middleware';

@Module({
  imports: [UsersModule, CatsModule],
  controllers: [AppController, AdminController],
  providers: [AppService, HttpService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      // use when have a middleware class method
      //.apply(LoggerMiddleware)

      .apply(logger)

      // Middleware for the route /cats with type method get
      //.forRoutes({ path: 'cats', method: RequestMethod.GET });

      //middleware for the route ab.*cd with any method type
      //.forRoutes({ path: 'ab.*cd', method: RequestMethod.ALL });

      .exclude(
        { path: 'cats', method: RequestMethod.GET },
        { path: 'cats', method: RequestMethod.POST },
        //'cats/(.*)',
      )
      //middleware for all methods in CatsController without that describe in exclude method
      .forRoutes(CatsController);
  }
}
