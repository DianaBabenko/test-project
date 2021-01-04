import { Controller, Get, HostParam } from '@nestjs/common';

@Controller({ host: ':localhost' })
export class AdminController {
  @Get('admin')
  index(): string {
    return 'Admin page';
  }

  @Get('info')
  getInfo(@HostParam('account') account: string) {
    console.log(account);
    return account;
  }
}
