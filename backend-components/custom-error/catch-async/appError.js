class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith(4) ? "fail" : "error";
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

module.exports = AppError;








// https://github.com/yuangao0317/ms-shared-common/blob/main/src/error-handler.ts

import { StatusCodes } from "http-status-codes";

export interface IError {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
}

export interface IErrorResponse {
  message: string;
  statusCode: number;
  status: string;
  comingFrom: string;
  serializeErrors(): IError;
}
export abstract class CustomError extends Error {
  public abstract readonly statusCode: number;
  public abstract readonly status: string;
  public readonly comingFrom: string;

  constructor(message: string, comingFrom: string) {
    super(message);
    this.comingFrom = comingFrom;

    // Ensuring the prototype chain is correctly set
    Object.setPrototypeOf(this, new.target.prototype);
  }

  serializeErrors(): IError {
    return {
      message: this.message,
      statusCode: this.statusCode,
      status: this.status,
      comingFrom: this.comingFrom,
    };
  }
}

export class BadRequestError extends CustomError {
  statusCode = StatusCodes.BAD_REQUEST;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
    // Ensuring the prototype chain is correctly set
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
}

export class NotAuthorizedError extends CustomError {
  statusCode = StatusCodes.UNAUTHORIZED;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
    // Ensuring the prototype chain is correctly set
    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }
}

export class NotFoundError extends CustomError {
  statusCode = StatusCodes.NOT_FOUND;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
    // Ensuring the prototype chain is correctly set
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

export class BadGatewayError extends CustomError {
  statusCode = StatusCodes.BAD_GATEWAY;
  status = "error";

  constructor(message: string, comingFrom: string) {
    super(message, comingFrom);
    // Ensuring the prototype chain is correctly set
    Object.setPrototypeOf(this, BadGatewayError.prototype);
  }
}
