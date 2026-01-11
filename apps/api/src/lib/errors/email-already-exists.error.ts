import { AppError } from "./app-error";

export class EmailAlreadyExistsError extends AppError {
  constructor() {
    super("EmailAlreadyExistsError", 401, "EMAIL_ALREADY_EXISTS");
  }
}
