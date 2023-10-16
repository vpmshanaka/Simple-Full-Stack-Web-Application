import { Controller, Get } from '@nestjs/common';

@Controller()
export class MainController {
  @Get()
  getHello(): string {
    return 'Welcome to the API!';
  }
}
