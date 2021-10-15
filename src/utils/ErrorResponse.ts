class ErrorResponse extends Error {
  constructor(public statusCode: number, message: string) {
    super(message);
    Object.setPrototypeOf(this, ErrorResponse.prototype);
  }
}

export default ErrorResponse;
