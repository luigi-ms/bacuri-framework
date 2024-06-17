/** @fileoverview Class used for managing the Plugins
 * @version 0.1.0-alpha
 * @author Luigi Moraes 
* **/

import { exec } from "child_process";
import {
  Exception,
  DownloadException,
  GenericException,
} from "./Exceptions.js";

import PlugIn from "./PlugIn.js";
import RegistryManagement from "./RegistryManagement.js";

export default class PlugInList {
  protected _list: Map<string, PlugIn>;
  protected _filesOps: RegistryManagement;
  protected _length: number;
  protected _last: PlugIn;

  constructor() {
    this._list = new Map();
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
        const plName = pluginName.split('/')[1];
        this._list.set(plName, this._last);
      })
      .catch((rej) => console.error(rej))
      .finally(() => console.warn("Download finished"));
  }
  /*
  public updatePlugin(oldPlugin: PlugIn): void {
    const updatedPlugin = updatePlugin(oldPlugin.name);
    const oldID = oldPlugin.id;
    updatedPlugin.id = oldID;

    this._list.set(oldID, updatedPlugin);
  }

  public del(pluginID: number): void {
    if (this._list.has(pluginID)) {
      this._list.delete(pluginID);
    } else {
      throw new Error("This id isn't related to any plugin.");
    }
  }

  public searchByName(pluginName: string): PlugIn | void {
    //1. Syncronize so I can use an updated list
    //2. Look up in the this._list
    //3. Return the info of found plugin

    /*
    try {
      this._list = FilesOperations.syncronize();
      const result: PlugIn = Array.from(this._list.values()).filter((pl) => {
        return pl.name === pluginName;
      })[0];

      if (result) {
        return result;
      } else {
        throw new GenericException("No Plugin found");
      }
    } catch (err: any) {
      console.error(err);
    }
    
  }
*/

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

  /**
   * Uses Github API to validate plugin's existence
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
