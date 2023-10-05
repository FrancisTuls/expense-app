import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  HttpException,
  HttpStatus,
  Body,
  HttpCode,
  ParseUUIDPipe,
  ParseEnumPipe,
} from '@nestjs/common';
import { ReportType } from 'src/data';
import { ReportService } from './report.service';
import {
  CreateReportDTO,
  ResponseReportDTO,
  UpdateReportDTO,
} from 'src/dtos/report.dto';

//**TODO: VALIDATION = 1. Check uuid=Done 2. Body is correct=Done 3. type is either income or expense only

@Controller('report/:type') //*main endpoint localhost:3000/report/income or expense
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  //*Get all reports of income or expense localhost:3000/report/income or expense
  @Get('')
  getAllReports(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
  ): ResponseReportDTO[] {
    if (type !== 'income' && type !== 'expense') {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getAllReports(reportType);
  }

  //*Get data of an ID localhost:3000/report/:type/:id
  @Get(':id')
  getReportById(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
  ): ResponseReportDTO {
    if (type !== 'income' && type !== 'expense') {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.getReportById(reportType, id);
  }

  //*Create report using POST localhost:3000/report/:type/
  @Post('')
  createReport(
    @Body() { amount, source }: CreateReportDTO, //*Body: the data (JSON)
    @Param('type', new ParseEnumPipe(ReportType)) type: string, //*Param: getting the endpoint
  ): ResponseReportDTO {
    if (type !== 'income' && type !== 'expense') {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.createReport(reportType, { amount, source });
  }

  //*Update a report using Put localhost:3000/report/:type/:id
  @Put(':id')
  updateReport(
    @Param('type', new ParseEnumPipe(ReportType)) type: string,
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateReportDTO, //*Parameters are type and ID to be more specific on what ID to Update
  ): ResponseReportDTO {
    if (type !== 'income' && type !== 'expense') {
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
    }
    const reportType =
      type === 'income' ? ReportType.INCOME : ReportType.EXPENSE;
    return this.reportService.updateReport(reportType, id, body);
  }

  @HttpCode(204)
  @Delete(':id')
  deleteReport(@Param('id', ParseUUIDPipe) id: string) {
    return this.reportService.deleteReport(id);
  }
}
