import {Interface} from "readline";

/* declarations for index.ts*/
declare const r: Interface;

/* declarations for classes*/
declare class PlugIn {
  constructor(name: string, description: string);

  public id: string;
  public get name(): string;
  public get description(): string;
  public get version(): number;
  public get author(): string;
}

declare class PlugInList {
  constructor();

  public add(pluginName: string): void;
  public update(oldPlugin: PlugIn): void;
  public del(pluginID: string): void | Error;
  public searchByName(pluginName: string): PlugIn | Error;
  public get list(): Map<string, PlugIn>;
  public get length(): number;
}
