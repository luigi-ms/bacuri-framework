/** @fileoverview Class used for managing the Plugins
 * @version 0.1.0-alpha
 * @author Luigi Moraes
 * **/

import PlugIn from "./PlugIn.js";
import RegistryManagement from "./RegistryManagement.js";
import RepoOperations from "./RepoOperations.js";
import { Exception, NoPluginException } from "./Exceptions.js";
import { appendFile } from "fs";
import path from "path";

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
   * Downloads and saves in the Map
   * @param {string} pluginName
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

  public updatePlugin(pluginName: string): void {
    this._repoOps
      .pullFromRemote(pluginName)
      .catch((rej) => console.error(rej.getResume()));
  }

  public async del(pluginName: string): Promise<void | Exception> {
    const removedPlugin = this._list.get(pluginName);

    if (removedPlugin) {
      await this._filesOps.removeFromRegistry(removedPlugin);

      this._list.delete(pluginName);
    } else {
      return Promise.reject(new NoPluginException());
    }
  }

  public async searchByName(pluginName: string): Promise<PlugIn | void> {
    //NOTE: plugin folder name must be snakecased
    const result = this._list.get(pluginName);

    return result
      ? Promise.resolve(result)
      : Promise.reject(new NoPluginException());
  }

  public pluginIntegrate(plName: string): void {
    const filePath = `${this._homePath}/core/plugins.scss`;
    const data = `@import ${this._homePath}/installed/${plName}/main;\n`;

    appendFile(filePath, data, (err) => {
      if (err) console.error(err);
    });
  }

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
