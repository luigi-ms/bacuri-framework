export abstract class Exception {
  protected _code: string;
  protected _name: string;
  protected _message: string;
  public details: string;

  constructor() {
    this._code = "";
    this._name = "";
    this._message = "";
    this.details = "no extra info";
  }

  public getResume(): string {
    return `[${this.code}] ${this.name}: ${this.message}(${this.details})`;
  }

  public get code(): string {
    return this._code;
  }
  public get name(): string {
    return this._name;
  }
  public get message(): string {
    return this._message;
  }
}

export class GenericException extends Exception {
  constructor(details: string="no extra info") {
    super();
    this._code = "EXCEP";
    this._name = "GenericException";
    this.details = details;
  }
}

export class ReadFileException extends Exception {
  constructor(details: string="no extra info") {
    super();
    this._code = "FILE01";
    this._name = "ReadFileException";
    this._message = "Cannot open or read this file";
    this.details = details;
  }
}

export class NoFileException extends Exception {
  constructor(details: string="no extra info") {
    super();
    this._code = "FILE02";
    this._name = "NoFileException";
    this._message = "This file can't be reached or doesn't exist";
    this.details = details;
  }
}

export class DownloadException extends Exception {
  constructor(details: string="no extra info") {
    super();
    this._code = "DOWN01";
    this._name = "DownloadException";
    this._message = "Something happened downloading this plugin";
    this.details = details;
  }
}
