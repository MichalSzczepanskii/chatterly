import { ApiError } from '@chatterly/shared/data-access';

export class ApiErrorFactory {
  static create(statusCode: number, message?: string): ApiError {
    return {
      error: {
        statusCode,
        message,
      },
    };
  }
}
