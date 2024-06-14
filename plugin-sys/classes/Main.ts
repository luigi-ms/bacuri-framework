import PlugInList from "./PlugInList.js";
import FilesOperations from "./FilesOperations.js";
import PlugIn from "./PlugIn.js";
import SysOperations from "./SysOperations.js";

export enum Options {
  Add = "-a",
  Init = "-i",
  Pull = "-p",
  Update = "-u",
  Remove = "-r",
  Version = "-v",
  Help = "-h",
  Save = "-s",
}

export class Main {
  protected _list: PlugInList;

  constructor(list: PlugInList) {
    this._list = list;
  }

  public add(pluginName: string): void {
    console.log("Please wait while we look for it");
    SysOperations.existsInRemote(pluginName)
      .then(() => {
        console.warn("Your plugin was found!");
        console.log("Downloading...");
        this._list.add(pluginName);
      })
      .catch(() => {
        console.error(`Sorry, looks like ${pluginName} is not available :(`);
      });
  }

  public pull(): void {
    console.log("Retrieving");
  }

  public upd(): void {
    console.log("updating");
  }

  public del(): void {
    console.log("Removing");
  }

  public save(pluginName: string): void {
    FilesOperations.readManifest(pluginName)
      .then((json) => {
        const pl = new PlugIn(json.name, json.description);

        pl.author = json.author;
        pl.version = json.version;

        return pl;
      })
      .then((pl) => {
        FilesOperations.updateRegistry(pl);
      })
      .catch((rej) => console.error(rej));
  }

  public getVersion(): void {
    console.log("v0.1.0-alpha");
  }

  public help(): void {
    console.log(`Usage: p-sys [option] [name] or
    p-sys [option] [author/name]
          -a [author/name] Adds a new plugin
          -i Creates the registry file
          -d [name] Deletes a plugin
          -h Shows this help log
          -p [name] Pulls info from installed plugin
          -s [name] Save data from last installed
          -u [author/name] Updates a plugin
          -v Shows version of this system`);
  }

  public start(): void {
    FilesOperations.createEmptyFile("./registry.json").catch((rej) =>
      console.error(rej)
    );
  }
}
