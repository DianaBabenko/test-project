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
//import { LoggerMiddleware } from './logger.middleware';
import { CatsController } from './cats/cats.controller';
import { logger } from './logger.middleware';
import {APP_PIPE} from "@nestjs/core";
import {ValidationPipe} from "./validation.pipe";
//import { APP_FILTER } from '@nestjs/core';
//import { HttpExceptionFilter } from './http-exception.filter';
//import { AllExceptionsFilterExample } from './all-exceptions-filter.filter';

@Module({
  imports: [UsersModule, CatsModule],
  controllers: [AppController, AdminController],
  providers: [
    AppService,
    HttpService,
    //register global filters from outside of any modules
    // {
    //   provide: APP_FILTER,
    //   useClass: AllExceptionsFilterExample,
    // },

    //set up a global pipe directly from any module
    // {
    //   provide: APP_PIPE,
    //   useClass: ValidationPipe,
    // },
  ],
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
        'cats/(.*)',
      )
      //middleware for all methods in CatsController without that describe in exclude method
      .forRoutes(CatsController);
  }
}
