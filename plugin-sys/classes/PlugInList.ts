import PlugIn from "./PlugIn";
import { 
//  erasePlugin, 
  updatePlugin 
} from "../operations";
import downloadPlugin from "../operations/download";

export default class PlugInList {
  protected _list: Map<string, PlugIn>;
  protected _length: number;

  constructor(){
    this._list = new Map();
    this._length = 0;
  }

  public add(pluginName: string): void {
    const newPlugin = downloadPlugin(pluginName);
    const newID = "";
    newPlugin.id = newID;
    this._list.set(newID, newPlugin);
  }
  
  public update(oldPlugin: PlugIn): void {
    const updatedPlugin = updatePlugin(oldPlugin.name);
    const oldID = oldPlugin.id;
    updatedPlugin.id = oldID;

    this._list.set(oldID, updatedPlugin);
  }

  public del(pluginID: string): void | Error {
    if(this._list.has(pluginID)){
      this._list.delete(pluginID);
    }else{
      throw new Error("This id isn't related to any plugin.");
    }
  }

  public searchByName(pluginName: string): PlugIn | Error {
    for(let pl of this._list.values()){
      if(pl.name === pluginName){
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
