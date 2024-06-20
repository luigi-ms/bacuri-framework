/** @fileoverview Class used for managing the Plugins
 * @version 0.1.0-alpha
 * @author Luigi Moraes
 * **/

import { exec } from "child_process";
import PlugIn from "./PlugIn.js";
import RegistryManagement from "./RegistryManagement.js";
import {
  Exception,
  DownloadException,
  GenericException,
  NoPluginException,
} from "./Exceptions.js";

export default class PlugInList {
  protected _list: Map<string, PlugIn>;
  protected _filesOps: RegistryManagement;
  protected _length: number;
  protected _last: PlugIn;

  constructor(map?: Map<string, PlugIn>) {
    this._list = map ?? new Map();
    this._filesOps = new RegistryManagement();
    this._length = 0;
    this._last = new PlugIn("", "");
  }

  /**
   * Downloads and saves in the Map
   * @param {string} pluginName
   * **/
  public add(pluginName: string): void {
    this._download(pluginName)
      .then(() => {
        const plName = pluginName.split("/")[1];
        this._list.set(plName, this._last);
      })
      .catch((rej) => console.error(rej))
      .finally(() => console.warn("Download finished"));
  }

  /*
  public updatePlugin(oldPlugin: PlugIn): void {
    try{
      const oldVersion = this._getPluginVersion(oldPlugin.name);

      if()
    }catch(err){
      console.error(err);
    }
    const updatedPlugin = updatePlugin(oldPlugin.name);
    const oldID = oldPlugin.id;
    updatedPlugin.id = oldID;

    this._list.set(oldID, updatedPlugin);
  }
*/

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

  /**
   * Download the plugin and save in ./installed folder
   * @param {string} pluginName
   * @throws Exception
   * @see child_process#exec
   **/
  protected _download(pluginName: string): Promise<void | Exception> {
    const nameSplitted: string = pluginName.split("/")[1];

    try {
      exec(
        `git clone https://github.com/${pluginName} ./installed/${nameSplitted}`,
        (err, out, stderr) => {
          if (err) {
            console.error(err);
            return;
          }

          //Git clone writes to the error stream for
          //its own so is better let the log instead
          //of error
          console.log(out);
          console.log(stderr);
        }
      );

      return Promise.resolve();
    } catch (err: any) {
      return Promise.reject(
        err instanceof Error
          ? new GenericException(err.message)
          : new DownloadException(err)
      );
    }
  }

  protected _getPluginVersion(pluginName: string): string {
    if (this._list.has(pluginName)) {
      const plugin = this._list.get(pluginName);

      return plugin ? plugin.version : "";
    } else {
      throw new NoPluginException();
    }
  }

  /**
   * Uses Github API to check plugin's existence
   * @param {string} pluginName
   * @returns {Promise<boolean>}
   * */
  public async existsInRemote(pluginName: string): Promise<boolean> {
    const res: Response = await fetch(
      `https://api.github.com/repos/${pluginName}`
    );
    const json = await res.json();

    return json.message === "Not Found"
      ? Promise.reject(false)
      : Promise.resolve(true);
  }

  public get list(): Map<string, PlugIn> {
    return this._list;
  }

  public get filesOps(): RegistryManagement {
    return this._filesOps;
  }

  public get length(): number {
    return this._length;
  }

  public get last(): PlugIn {
    return this._last;
  }
}
