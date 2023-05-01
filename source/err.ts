export class NoNameError extends ErrorEvent {
  constructor(msg: string) {
    super("NoNameError", { "message": msg });
  }
}

export class CountryNotFoundError extends ErrorEvent {
  constructor(msg: string) {
    super("CountryNotFoundError", { "message": msg });
  }
}
