import { exec } from "child_process";
import {
  Exception,
  DownloadException,
  GenericException,
} from "./Exceptions.js";

export default class SysOperations {
  /**
   * Download the plugin and save in ./installed folder
   * @param {string} pluginName
   * @returns {void | Exception} a Promise that resolves to nothing or rejects an Exception
   * @see child_process#exec
   * @see Exception
   **/
  public static download(pluginName: string): Promise<void | Exception> {
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
  public static async existsInRemote(pluginName: string): Promise<boolean> {
    const res: Response = await fetch(
      `https://api.github.com/repos/${pluginName}`
    );
    const json = await res.json();

    return json.message === "Not Found"
      ? Promise.reject(false)
      : Promise.resolve(true);
  }
}
