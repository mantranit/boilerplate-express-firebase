export class BadRequestError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "BadRequestError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class UnauthorizedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "UnauthorizedError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class PaymentRequiredError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "PaymentRequiredError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class ForbiddenError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "ForbiddenError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotFoundError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class MethodNotAllowedError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "MethodNotAllowedError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class NotAcceptableError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "NotAcceptableError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}

export class InternalServerError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = "InternalServerError";
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
