import { Controller, Get, Post, Put, Delete } from '@nestjs/common';

@Controller('report/:type')
export class AppController {
  @Get('')
  getAllIncomeReports() {
    return [];
  }

  @Get(':id')
  getIncomeReportById() {
    return {};
  }

  @Post('')
  createReport() {
    return 'Created';
  }

  @Put(':id')
  updateReport() {
    return 'Updated';
  }

  @Delete(':id')
  deleteReport() {
    return 'Deleted';
  }
}
