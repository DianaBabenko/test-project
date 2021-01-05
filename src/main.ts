import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { logger } from './logger.middleware';
//import { HttpExceptionFilter } from './http-exception.filter';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { ValidationPipe } from './validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  //use global middleware function
  app.use(logger);

  //catch all exceptions
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new AllExceptionsFilter(httpAdapter));

  //global scoped pipes
  app.useGlobalPipes(new ValidationPipe());

  //use global-scoped filter
  //app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(3000);
}
bootstrap();
