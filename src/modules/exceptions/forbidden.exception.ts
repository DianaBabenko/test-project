import { HttpException, HttpStatus } from '@nestjs/common';

//create a custom exceptions
export class ForbiddenException extends HttpException {
  constructor() {
    super('Forbidden', HttpStatus.FORBIDDEN);
  }
}
