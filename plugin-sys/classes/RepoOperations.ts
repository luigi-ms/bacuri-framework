import { exec } from "child_process";
import path from "path";
import { DownloadException, GenericException } from "./Exceptions.js";

export default class RepoOperations {
  constructor() {}

  /**
   * Download the plugin and save in ./installed folder
   * @param {string} pluginName
   * @throws Exception
   * @see child_process#exec
   **/
  public download(pluginName: string): Promise<void> {
    const nameSplitted: string = pluginName.split("/")[1];
    const folderPath = path.resolve("installed", nameSplitted);

    try {
      exec(
        `git clone https://github.com/${pluginName} ${folderPath}`,
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

  public async pullFromRemote(folder: string): Promise<void> {
    const folderPath = path.resolve("installed", folder);

    try {
      exec(`cd ${folderPath} && git pull`, (err, out, stderr) => {
        if (err) {
          console.error(err);
          return;
        }

        console.log(out);
        console.error(stderr);
        return Promise.resolve();
      });
    } catch (err: any) {
      return Promise.reject(new GenericException(err.message));
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
}
