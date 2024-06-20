/**
 * Implements all operations available to the user
 * @class **/

import PlugInList from "./PlugInList.js";
import PlugIn from "./PlugIn.js";

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
    /**
     * @param {PlugInList} list
     * @protected **/
    this._list = list;
  }

  public add(pluginName: string): void {
    console.log("Please wait while we look for it");
    this._list.repoOps
      .existsInRemote(pluginName)
      .then(() => {
        console.warn("Your plugin was found!");
        console.log("Downloading...");
        this._list.add(pluginName);
      })
      .catch(() => {
        console.error(`Sorry, looks like ${pluginName} is not available :(`);
      });
  }

  public pull(pluginName: string): void {
    console.log("Retrieving...");
    this._list
      .searchByName(pluginName)
      .then((res) => console.log(res))
      .catch((rej) => console.error(rej.getResume()));
  }

  public upd(pluginName: string): void {
    // 1. Try run a git pull inside the plugin folder
    // 2. Try run a git clone and replace the folder
   this._list.updatePlugin(pluginName) 
  }

  public del(pluginName: string): void {
    this._list
      .del(pluginName)
      .then(() => this._list.filesOps.removeFromDir(pluginName))
      .catch((rej) => console.error(rej));
  }

  public save(pluginName: string): void {
    this._list.filesOps
      .readManifest(pluginName)
      .then((json) => {
        const pl = new PlugIn(json.name, json.description);

        pl.author = json.author;
        pl.version = json.version;

        return pl;
      })
      .then((pl) => {
        this._list.filesOps.addToRegistry(pl);
      })
      .catch((rej) => console.error(rej.getResume()));
  }

  public getVersion(): void {
    console.log("v0.1.0-alpha");
  }

  public help(): void {
    console.log(`Usage: p-sys [option] [name] or
    p-sys [option] [author/name]
          -a [author/name] Adds a new plugin
          -i Creates the registry file
          -h Shows this help log
          -p [name] Pulls info from installed plugin
          -r [name] Removes a plugin
          -s [name] Save data from last installed
          -u [author/name] Updates a plugin
          -v Shows version of this system`);
  }

  public start(): void {
    const content = JSON.stringify({ list: [] });
    this._list.filesOps
      .createFile("./registry.json", content)
      .catch((rej) => console.error(rej));
  }
}
