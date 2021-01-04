import {
  Controller,
  Get,
  //Req,
  Post,
  //HttpCode,
  //Header,
  Redirect,
  Query,
  Param,
  Body,
  UseFilters,
  //Res,
  //HttpStatus,
  //HttpException,
} from '@nestjs/common';
//import { Response } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
//import { Cat } from './interfaces/cat.interface';
import { ForbiddenException } from '../forbidden.exception';
import { HttpExceptionFilter } from '../http-exception.filter';

//import { Request } from 'express';

@Controller('cats')
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}
  // @Get()
  // @Redirect('cats/ab*cd', 301)
  // findAll(@Req() request: Request): string {
  //   return 'This action returns all cats';
  // }

  @Post()
  //@UseFilters(new HttpExceptionFilter())
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
    throw new ForbiddenException();
  }

  // Method which use async & promise
  // @Get()
  // async findAllWithPromise(): Promise<Cat[]> {
  //   return this.catsService.findAll();
  // }

  // Method which use @Res
  // @Post()
  // create(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send();
  // }

  // get method with async
  // @Get()
  // async findAll(@Res({ passthrough: true }) res: Response) {
  //   res.status(HttpStatus.OK);
  //   return [];
  // }

  @Get()
  async findAll() {
    //Throwing standard exceptions
    //throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    //overriding the entire response body
    // throw new HttpException(
    //   {
    //     status: HttpStatus.FORBIDDEN,
    //     error: 'This is a custom test message',
    //   },
    //   HttpStatus.FORBIDDEN,
    // );

    //built-in exception handler
    throw new ForbiddenException();
  }

  @Get('ab.*cd')
  find() {
    return 'This route uses a wildcard';
  }

  @Get('docs')
  @Redirect('error/302', 302)
  getDocs(@Query('version') version) {
    if (version && version === '5') {
      return { url: 'ab*cd' };
    }
  }

  @Get('error/:code')
  showError(@Param() params) {
    return `page with error ${params.code}`;
  }

  // Method that provides access to all params in url
  // @Get(':id')
  // findById(@Param() params) {
  //   console.log(params.id);
  //   return `This method return info about cat #${params.id}`;
  // }

  @Get(':id')
  findOne(@Param('id') id: bigint): string {
    return `This action returns a #${id} cat`;
  }

  @Get('promise')
  async findAllCats(): Promise<any[]> {
    return [];
  }

  @Get('observable')
  findAllObservable(): Observable<any[]> {
    return of([]);
  }
}
