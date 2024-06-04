import { v4 as uuid } from "uuid";
import PlugIn from "./PlugIn";
import FilesOperations from "./FilesOperations";
import SysOperations from "./SysOperations";
import {Exception} from "../exceptions";

export default class PlugInList {
  protected _list: Map<string, PlugIn>;
  protected _length: number;

  constructor() {
    this._list = new Map();
    this._length = 0;
  }

  public async add(pluginName: string): Promise<void> {
    try{
      await SysOperations.download(pluginName);
      const manifestFile = await FilesOperations.readManifest(pluginName);
      const newPlugin = new PlugIn(manifestFile.name, manifestFile.description);
      const id = uuid();

      newPlugin.id = id;
      this._list.set(id, newPlugin);

      await FilesOperations.updateRegistry(newPlugin);
      console.log("Registered!");
    }catch(err){ 
      console.error((err instanceof Exception)
        ? err.getResume()
        : err
      );
    }
  }

  public updatePlugin(oldPlugin: PlugIn): void {
    const updatedPlugin = updatePlugin(oldPlugin.name);
    const oldID = oldPlugin.id;
    updatedPlugin.id = oldID;

    this._list.set(oldID, updatedPlugin);
  }

  public del(pluginID: string): void {
    if (this._list.has(pluginID)) {
      this._list.delete(pluginID);
    } else {
      throw new Error("This id isn't related to any plugin.");
    }
  }

  public searchByName(pluginName: string): PlugIn {
    for (let pl of this._list.values()) {
      if (pl.name === pluginName) {
        return pl;
      }
    }

    throw new Error("There's no plugin with this name :(");
  }

  public get list(): Map<string, PlugIn> {
    return this._list;
  }

  public get length(): number {
    return this._length;
  }
}
