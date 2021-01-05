import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './modules/middlewares/logger.middleware';
//import { HttpExceptionFilter } from './http-exception.filter';
import { AllExceptionsFilter } from './modules/filters/all-exceptions.filter';
import { ValidationPipe } from './modules/pipes/validation.pipe';
import { LoggingInterceptor } from './modules/interceptors/logging.interceptor';
//import {RolesGuard} from "./roles/roles.guard";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //use global middleware function
  app.use(logger);

  //catch all exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  //global scoped pipes
  app.useGlobalPipes(new ValidationPipe());

  //set up a global interceptor
  app.useGlobalInterceptors(new LoggingInterceptor());

  //set up a global guard
  //app.useGlobalGuards(new RolesGuard());

  //use global-scoped filter
  //app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
