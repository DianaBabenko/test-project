import {
  Controller,
  Get,
  //Req,
  Post,
  HttpCode,
  Header,
  Redirect,
  Query,
  Param,
  Body,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import {CatsService} from "./cats.service";
//import { Request } from 'express';

@Controller('cats')
export class CatsController {
  constructor(private catsService: CatsService) {}
  // @Get()
  // @Redirect('cats/ab*cd', 301)
  // findAll(@Req() request: Request): string {
  //   return 'This action returns all cats';
  // }

  @Post()
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
  }

  // Method which use @Res
  // @Post()
  // create(@Res() res: Response) {
  //   res.status(HttpStatus.CREATED).send();
  // }

  @Get()
  findAll(@Res({ passthrough: true }) res: Response) {
    res.status(HttpStatus.OK);
    return [];
  }

  @Get('ab*cd')
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
