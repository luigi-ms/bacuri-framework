export default class PlugIn {
  public author: string;
  public version: string; 
  protected _name: string;
  protected _description: string;

  constructor(name: string, description: string){
    this.version = "0.0.0";
    this.author = "";
    this._name = name;
    this._description = description;
  }

  public get name(): string {
    return this._name;
  }
  
  public get description(): string {
    return this._description;
  }
}
