import PlugIn from "./PlugIn.js";
import FilesOperations from "./FilesOperations.js"; 
import SysOperations from "./SysOperations.js";

export default class PlugInList {
  protected _list: Map<number, PlugIn>;
  protected _length: number;
  protected _last: PlugIn;

  constructor() {
    this._list = new Map();
    this._length = 0;
    this._last = new PlugIn("", "");
  }

  public add(pluginName: string): void {
    // Try just download and save the list state
    // Save to the registry later, as a
    // separated feature.
    SysOperations.download(pluginName)
    .then(async () => {
        const manifestFile = await FilesOperations.readManifest(pluginName);
        const newPlugin: PlugIn = new PlugIn(manifestFile.name, manifestFile.description);
        const id: number = this._generateID();

        newPlugin.id = id;
        this._list.set(id, newPlugin);

        return newPlugin;
    })
    .then(async (pl: any) => {
      if(pl instanceof PlugIn){
        this._last = pl;
        this._length += 1;
        await FilesOperations.updateRegistry(pl);
        console.warn("Registered!");
      }
    })
    .catch((rej) => {
      console.error(rej);
    })
    .finally(() => console.warn("Download finished")); 
  }
/*
  public updatePlugin(oldPlugin: PlugIn): void {
    const updatedPlugin = updatePlugin(oldPlugin.name);
    const oldID = oldPlugin.id;
    updatedPlugin.id = oldID;

    this._list.set(oldID, updatedPlugin);
  }
*/
  public del(pluginID: number): void {
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

  protected _generateID(): number {
    return this._last.id *= 3;
  }

  public get list(): Map<number, PlugIn> {
    return this._list;
  }

  public get length(): number {
    return this._length;
  }
}
