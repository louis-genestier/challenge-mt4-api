import { HttpErrorCode } from './httpErrorCode'

export class ApiError {
  constructor(private _httpCode: HttpErrorCode, private _message: string) {
  }

  get json() {
    return {
      code: this._httpCode,
      message: this._message
    }
  }

  get httpCode(): HttpErrorCode {
    return this._httpCode
  }

  get message(): string {
    return this._message
  }
}