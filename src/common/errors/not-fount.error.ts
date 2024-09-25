export class NotFountError extends Error {
  private statusCode: number;
  constructor(message: string) {
    super(message);
    this.name = 'NotFountError';
    this.statusCode = 404;
  }
}
