export default class NoDuplicateEmailError extends Error {
  status: number;

  constructor(message: string) {
    super(message);
    Error.captureStackTrace(this, this.constructor);

    this.name = this.constructor.name;
    this.status = 409;
  }
}
