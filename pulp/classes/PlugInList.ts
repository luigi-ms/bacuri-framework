/** @fileoverview Class used for managing the Plugins
 * @version 0.1.0-alpha
 * @author Luigi Moraes
 * **/

import { appendFile, promises } from "fs";
import path from "path";
import PlugIn from "./PlugIn.js";
import RegistryManagement from "./RegistryManagement.js";
import RepoOperations from "./RepoOperations.js";
import { Exception, NoPluginException } from "./Exceptions.js";

export default class PlugInList {
  protected _list: Map<string, PlugIn>;
  protected _filesOps: RegistryManagement;
  protected _repoOps: RepoOperations;
  protected _length: number;
  protected _last: PlugIn;
  protected _homePath: string;

  constructor(map?: Map<string, PlugIn>) {
    this._list = map ?? new Map();
    this._filesOps = new RegistryManagement();
    this._repoOps = new RepoOperations();
    this._length = 0;
    this._last = new PlugIn("", "");
    this._homePath = import.meta.dirname
      .split(path.sep)
      .slice(0, -2)
      .join(path.sep);
  }

  /**
   * @description Downloads and stores the
   * plugin info in the Map
   * @param {string} pluginName
   * @returns void
   * @see RepoOperations#download
   * **/
  public add(pluginName: string): void {
    this._repoOps
      .download(pluginName)
      .then(() => {
        const plName = pluginName.split("/")[1];
        this._list.set(plName, this._last);
      })
      .catch((rej) => console.error(rej))
      .finally(() => console.warn("Download finished"));
  }

  /**
   * @description Pulls the plugin from Github and
   * replaces it.
   * @param {string} pluginName
   * @returns void
   * @see RepoOperations#pullFromRemote*/
  public updatePlugin(pluginName: string): void {
    this._repoOps
      .pullFromRemote(pluginName)
      .catch((rej) => console.error(rej.getResume()));
  }

  /**
   * @description Gets the plugin from the map, then
   * removes from the registry and the Map itself.
   * @param {string} pluginName
   * @returns Promise<void | NoPluginException>
   * @see RegistryManagement#removeFromRegistry */
  public async del(pluginName: string): Promise<void | Exception> {
    const removedPlugin = this._list.get(pluginName);

    if (removedPlugin) {
      await this._filesOps.removeFromRegistry(removedPlugin);

      this._list.delete(pluginName);
    } else {
      return Promise.reject(new NoPluginException());
    }
  }

  /**
   * @description Gets the plugin info from the Map
   * @param {string} pluginName
   * @returns Promise<PlugIn | NoPluginException> */
  public async searchByName(pluginName: string): Promise<PlugIn | void> {
    const result = this._list.get(pluginName);

    return result
      ? Promise.resolve(result)
      : Promise.reject(new NoPluginException());
  }

  /**
   * @description Saves the plugin path to the plugins.scss
   * @param {string} plName
   * @returns void */
  public pluginIntegrate(plName: string): void {
    const filePath = path.resolve("plugins.scss");
    const data = `@import 'installed/${plName}/main';\n`;

    appendFile(filePath, data, (err) => {
      if (err) console.error(err);
    });
  }

  /**
   * @description Erases the line with the plugin path from
   * the plugins.scss
   * @param {string} plName
   * @returns Promise<void> */
  public async pluginSeparate(plName: string): Promise<void> {
    const filePath = path.resolve("plugins.scss");

    try {
      const reader: string = await promises.readFile(filePath, "utf8");
      const plugins: Array<string> = reader.split("\n");
      const removed = plugins.filter((pl) => !pl.includes(plName));

      //Check if removed is empty
      //Write to file: /* erased */

      if(removed.length === 0){
        await promises.writeFile(filePath, JSON.stringify("/* erased */"));
      }else{
        await promises.writeFile(filePath, JSON.stringify(removed.join("\n")));
      }
    } catch (err) {
      console.error(err instanceof Exception ? err.getResume() : err);
    }
  }

  //Getters
  public get list(): Map<string, PlugIn> {
    return this._list;
  }

  public get filesOps(): RegistryManagement {
    return this._filesOps;
  }

  public get repoOps(): RepoOperations {
    return this._repoOps;
  }

  public get length(): number {
    return this._length;
  }

  public get last(): PlugIn {
    return this._last;
  }
}
