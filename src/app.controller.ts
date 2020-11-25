import { Controller, Get } from '@nestjs/common';

@Controller('')
export class AppController {
  @Get()
  welcome() {
    return 'Welcome to movie API.';
  }
}
