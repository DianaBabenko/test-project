import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
  Scope,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminController } from './admin/admin.controller';
import { UsersModule } from './users/users.module';
import { HttpService } from './modules/services/http.service';
import { CatsModule } from './cats/cats.module';
import { CatsController } from './cats/cats.controller';
import { logger } from './modules/middlewares/logger.middleware';
import { ConfigModule } from './config/config.module';
import { APP_PIPE } from '@nestjs/core';
import { ValidationPipe } from './modules/pipes/validation.pipe';
import { CommonService } from './common/common.service';
import { CommonModule } from './common/common.module';

// const mockCatsService = {
//   /* mock implementation
//   ...
//   */
// };

// const configServiceProvider = {
//   provide: ConfigService,
//   useClass:
//     process.env.NODE_ENV === 'development'
//       ? DevelopmentConfigService
//       : ProductionConfigService,
// };

// const connectionFactory = {
//   provide: 'CONNECTION',
//   useFactory: (optionsProvider: OptionsProvider) => {
//     const options = optionsProvider.get();
//     return new DatabaseConnection(options);
//   },
//   inject: [OptionsProvider],
// };

// @Injectable()
// class LoggerService {
//   /* implementation details */
// }
//
// const loggerAliasProvider = {
//   provide: 'AliasedLoggerService',
//   useExisting: LoggerService,
// };

// const configFactory = {
//   provide: 'CONFIG',
//   useFactory: () => {
//     return process.env.NODE_ENV === 'development' ? devConfig : prodConfig;
//   },
// };

@Module({
  imports: [
    UsersModule,
    CatsModule,
    ConfigModule.register({ folder: './config' }),
    CommonModule,
  ],
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
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
      scope: Scope.TRANSIENT,
    },
    CommonService,

    // set up an interceptor directly
    // {
    //   provide: APP_INTERCEPTOR,
    //   useClass: LoggingInterceptor,
    // },

    //set up guard for this module
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },

    //injecting a constant value, value providers
    // {
    //   provide: CatsService,
    //   useValue: mockCatsService,
    // },

    //Non-class-based provider token
    // {
    //   provide: 'CONNECTION',
    //   useValue: connection,
    // },

    //dynamically determine a class that a token should resolve to
    // configServiceProvider,

    // register factory provider
    //connectionFactory,

    // Alias providers
    // LoggerService,
    // loggerAliasProvider,

    //Non-service based provider, provider can supply any value
    //provider may supply an array of configuration objects based on the current environment
    //configFactory,

    //Asynchronous providers, as example you may not want to start accepting requests until the connection with the database has been established
    // {
    //   provide: 'ASYNC_CONNECTION',
    //   useFactory: async () => {
    //     const connection = await createConnection(options);
    //     return connection;
    //   },
    // },
  ],

  //Export custom provider
  // exports: ['CONNECTION'],

  //export with the full provider object
  // exports: [connectionFactory],
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
