import { Cat } from './interfaces/cat.interface';
import { ModuleRef } from '@nestjs/core';

//@Injectable({ scope: Scope.REQUEST })
export class CatsService {
  //constructor(private usersService: UsersService) {}

  //Injection scope
  // constructor(@Inject(REQUEST) private request: Request) {}
  //constructor(@Inject(CONTEXT) private context) {}

  //circular dependency
  // constructor(
  //   @Inject(forwardRef(() => CommonService))
  //   private commonService: CommonService,
  // ) {}

  //private commonService: CommonService;
  private readonly cats: Cat[] = [];

  //module reference injected in the normal way
  constructor(private moduleRef: ModuleRef) {}

  create(cat: Cat) {
    this.cats.push(cat);
  }

  findAll(): Cat[] {
    return this.cats;
  }

  //method retrieves a provider, controller, or injectable that exists in the current module using its injection token/class name
  //if the provider has been injected in a different module), pass the { strict: false }
  // omModuleInit() {
  //   this.commonService = this.moduleRef.get(CommonService, { strict: false });
  // }

  //to dynamically resolve a scoped provider (transient or request-scoped) use the resolve() method, passing the provider's injection token as an argument
  // async onModuleInit() {
  //   const transientServices = await Promise.all([
  //     this.moduleRef.resolve(CommonService),
  //     this.moduleRef.resolve(CommonService),
  //   ]);
  //   console.log(transientServices[0] === transientServices[1]);
  // }
}
