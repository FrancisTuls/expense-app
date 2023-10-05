import { Injectable } from '@nestjs/common';
import { ReportType, data } from './data';
import { v4 as uuid } from 'uuid';
import { ResponseReportDTO } from './dtos/report.dto';

interface Report {
  amount: number;
  source: string;
}

interface UpdateReport {
  amount?: number;
  source?: string;
}

@Injectable()
export class AppService {
  getAllReports(type: ReportType): ResponseReportDTO[] {
    //*Only take the types it want to get
    return data.report
      .filter((report) => report.type === type)
      .map((report) => new ResponseReportDTO(report)); //*use filter only to display all Ids
  }

  getReportById(type: ReportType, id: string): ResponseReportDTO {
    //*get type and id
    const report = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id); //*use filter then find ID

    if (!report) return;
    return new ResponseReportDTO(report);
  }

  createReport(type: ReportType, { amount, source }: Report) {
    //*include type and body
    const newReport = {
      id: uuid(),
      source,
      amount,
      created_at: new Date(),
      updated_at: new Date(),
      type,
    };
    data.report.push(newReport); //*Use push to create a new report
    return new ResponseReportDTO(newReport);
  }

  updateReport(type: ReportType, id: string, body: UpdateReport) {
    //*inlude type, id, and body
    const reportToUpdate = data.report
      .filter((report) => report.type === type)
      .find((report) => report.id === id);

    if (!reportToUpdate) return;

    const reportIndex = data.report.findIndex(
      (report) => report.id === reportToUpdate.id, //*Finding ID
    );

    data.report[reportIndex] = {
      ...data.report[reportIndex], //*copy all the data except the different values are updated
      ...body, //* the new values,
      updated_at: new Date(),
    };

    return new ResponseReportDTO(data.report[reportIndex]);
  }

  deleteReport(id: string) {
    const reportIndex = data.report.findIndex((report) => report.id === id);

    if (reportIndex === -1) return; //*-1 means the there is no such report

    data.report.splice(reportIndex, 1); //*Use splice to delete or you can filter

    return;
  }
}
