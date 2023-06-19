import { Controller, Get } from '@nestjs/common';

@Controller('income-reports')
export class AppController {
  @Get()
  getAllIncomeReports() {
    return [];
  }
}
