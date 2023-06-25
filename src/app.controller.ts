import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';

@Controller('report/:type')
export class AppController {
  @Get()
  getAllIncomeReports(@Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data?.reports?.filter((report) => report.type === reportType);
  }
  @Get(':id')
  getIncomeReportById(@Param('type') type: string, @Param('id') id: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data?.reports
      ?.filter((report) => report.type === reportType)
      .find((report) => report.id === id);
  }

  @Post()
  createReport(
    @Body() { amount, source }: { amount: number; source: string },
    @Param('type') type: string,
  ) {
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type: type === 'income' ? ReportType.INCOME : ReportType.EXPENSE,
    };
    data?.reports?.push(newReport);
    return newReport;
  }

  @Put(':id')
  updateReport(
    @Body()
    body: { amount: number; source: string; type: ReportType },
    @Param('id') id: string,
    @Param('type') type: string,
  ) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    const reportToUpdate = data?.reports
      ?.filter((report) => report.type === reportType)
      .find((report) => report.id === id);
    if (!reportToUpdate) {
      return;
    }

    const reportIndex = data.reports?.findIndex((report) => report?.id === id);

    data.reports[reportIndex] = {
      ...data?.reports[reportIndex],
      ...body,
    };
    return data.reports[reportIndex];
  }

  @Delete(':id')
  deleteReport(@Param('id') id: string, @Param('type') type: string) {
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return data?.reports?.filter((report) => report.type === reportType);
  }
}
