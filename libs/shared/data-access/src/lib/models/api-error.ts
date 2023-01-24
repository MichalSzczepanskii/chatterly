export interface ApiError {
  error: {
    statusCode: number;
    message?: string;
  };
}
