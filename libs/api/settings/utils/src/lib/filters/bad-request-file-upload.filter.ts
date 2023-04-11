import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
} from '@nestjs/common';
import { Request, Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';

interface ExceptionResponse {
  statusCode: number;
  message: string;
  error: string;
}

@Catch(BadRequestException)
export class BadRequestFileUploadFilter
  implements ExceptionFilter<BadRequestException>
{
  catch(exception: BadRequestException, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const { statusCode, message, error } =
      exception.getResponse() as ExceptionResponse;
    const fileName = request['file'].filename;
    const imagePath = path.join(
      process.cwd(),
      'uploads/profile-images',
      fileName
    );

    fs.unlink(imagePath, err => {
      if (err) console.error(err);
    });

    response.status(statusCode).json({
      statusCode,
      message,
      error,
    });
  }
}
