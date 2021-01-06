import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
  Redirect,
  UseFilters,
  UseInterceptors,
} from '@nestjs/common';
import { Observable, of } from 'rxjs';
import { CreateCatDto } from './dto/create-cat.dto';
import { CatsService } from './cats.service';
import { HttpExceptionFilter } from '../modules/filters/http-exception.filter';
import { Roles } from '../roles/roles.decorator';
import { LoggingInterceptor } from '../modules/interceptors/logging.interceptor';
import { TransformInterceptor } from '../modules/interceptors/transform.interceptor';

@Controller({
  path: 'cats',
  //scope: Scope.REQUEST,
})
//@UseGuards(RolesGuard)
//@UseGuards(new RolesGuard())
//@UseInterceptors(LoggingInterceptor)
@UseInterceptors(new LoggingInterceptor())
@UseFilters(new HttpExceptionFilter())
export class CatsController {
  constructor(private catsService: CatsService) {}
  @Get()
  // @UseInterceptors(ExcludeNullInterceptor)
  // @UseInterceptors(ErrorsInterceptor)
  // @UseInterceptors(CacheInterceptor)
  // @UseInterceptors(TimeoutInterceptor)
  //@Redirect('cats/ab*cd', 301)
  findAll() {
    //const cats = this.catsService.findAll();
    //this.catsService.onModuleInit();
    //return cats.length > 0 ? cats : 'cats not found';
    return this.catsService.findAll();
  }

  // @Post()
  // @UseFilters(new HttpExceptionFilter())
  // @HttpCode(204)
  // @Header('Cache-Control', 'none')
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  //   throw new ForbiddenException();
  // }

  //method post with validation pipe
  // @Post()
  // @UsePipes(new JoiValidationPipe(createCatSchema))
  // async create(@Body() createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  //Pipe is called to validate the post body
  // @Post()
  // async create(@Body(new ValidationPipe()) createCatDto: CreateCatDto) {
  //   this.catsService.create(createCatDto);
  // }

  @Post()
  @Roles('admin')
  //it's not good practice to use @SetMetadata() directly in your routes
  //@SetMetadata('roles', ['admin'])
  async create(@Body() createCatDto: CreateCatDto) {
    this.catsService.create(createCatDto);
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

  //@Get()
  //@UseInterceptors(LoggingInterceptor)
  //async findAll() {
  // async findAll(
  //@Query('activeOnly', new DefaultValuePipe(false), ParseBoolPipe) activeOnly: boolean,
  //@Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
  // ) {
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
  //throw new ForbiddenException();

  //return this.catsService.findAll({activeOnly, page});
  //}

  @Get('ab.*cd')
  //@UseGuards(RolesGuard)
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
  @UseInterceptors(TransformInterceptor)
  async findOne(@Param('id', new ParseIntPipe()) id) {
    return `This action returns a #${id} cat`;
  }

  //select an existing user entity
  // @Get(':id')
  // findOne(@Param('id', UserByIdPipe) userEntity: UserEntity) {
  //   return userEntity;
  // }

  // an in-place instance of Pipe
  // @Get(':id')
  // async findOne(
  //   @Param(
  //     'id',
  //     new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  //   )
  //   id: number,
  // ) {
  //   return `This action returns a #${id} catssss`;
  // }

  @Get('example')
  async findOneExample(@Query('id', ParseIntPipe) id: number) {
    return `This action returns a #${id} cat`;
  }

  // example 123e4567-e89b-12d3-a456-426655440000
  // @Get(':uuid')
  // async findOneUUID(@Param('uuid', new ParseUUIDPipe()) uuid: string) {
  //   return `This method check if the ( ${uuid} ) is uuid`;
  // }

  @Get('promise')
  async findAllCats(): Promise<any[]> {
    return [];
  }

  @Get('observable')
  findAllObservable(): Observable<any[]> {
    return of([]);
  }
}
