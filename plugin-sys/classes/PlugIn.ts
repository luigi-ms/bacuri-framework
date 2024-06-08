export default class PlugIn {
  public id: number;
  protected _name: string;
  protected _author: string;
  protected _version: number;
  protected _description: string;

  constructor(name: string, description: string){
    this.id = 1;
    this._name = name;
    this._description = description;
    this._version = 0;
    this._author = "";
  }

  public get name(): string {
    return this._name;
  }
  
  public get description(): string {
    return this._description;
  }

  public get version(): number {
    return this._version;
  }

  public get author(): string {
    return this._author;
  }
}
