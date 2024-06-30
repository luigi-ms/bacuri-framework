/**
 * Implements all operations available to the user
 * @class **/

import PlugInList from "./PlugInList.js";
import PlugIn from "./PlugIn.js";
import path from "path";

//Options know by the system
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

  //synced with registry methods
  /**
   * @description Check if plugin exists in Github then
   * tries to clone it.
   * @see RepoOperations#existsInRemote
   * @see PlugInList#add */
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

  /**@description Pull plugin info fron registry by
   * looking for its name.
   * @see PlugInList#searchByName */
  public pull(pluginName: string): void {
    console.log("Retrieving...");
    this._list
      .searchByName(pluginName)
      .then((res) => console.log(res))
      .catch((rej) => console.error(rej.getResume()));
  }

  /**@see PlugInList#updatePlugin **/
  public upd(pluginName: string): void {
    this._list.updatePlugin(pluginName);
  }

  /**
   * @description Removes from the Map, then the files
   * from the folder, and erases the line in the
   * plugins.scss.
   * @see PlugInList#del
   * @see PlugInList#pluginSeparate
   * @see RegistryManagement#removeFromDir*/
  public del(pluginName: string): void {
    this._list
      .del(pluginName)
      .then(() => this._list.filesOps.removeFromDir(pluginName))
      .then(() => this._list.pluginSeparate(pluginName))
      .catch((rej) => console.error(rej));
  }

  /**
   * @description Reads the manifest file and save the info
   * in registry and plugins.scss.
   * @see RegistryManagement#readManifest
   * @see RegistryManagement#addToRegistry
   * @see PlugInList#pluginIntegrate **/
  public save(pluginName: string): void {
    this._list.filesOps
      .readManifest(pluginName)
      .then((json) => {
        const pl = new PlugIn(json.name, json.description);

        pl.author = json.author;
        pl.version = json.version;

        this._list.filesOps.addToRegistry(pl);
        return pl;
      })
      .then((pl) => this._list.pluginIntegrate(pl.name))
      .catch((rej) => console.error(rej.getResume()));
  }

  //not synced with registry methods
  public getVersion(): void {
    console.log("v0.1.0-alpha");
  }

  public help(): void {
    console.log(`Usage: pulp [option] [name] or
    pulp [option] [author/name]
          -a [author/name] Adds a new plugin
          -i Creates the registry file
          -h Shows this help log
          -p [name] Pulls info from installed plugin
          -r [name] Removes a plugin
          -s [name] Save data from last installed
          -u [author/name] Updates a plugin
          -v Shows version of this system`);
  }

  /**
   * @description Creates the necessary files for
   * the plugin management.
   * @see RegistryManagement#createFile */
  public start(): void {
    const content = JSON.stringify({ list: [] });
    this._list.filesOps
      .createFile("registry.json", content)
      .then(() => {
        this._list.filesOps.createFile(path.resolve("plugins.scss"), "");
      })
      .catch((rej) => console.error(rej));
  }
}
