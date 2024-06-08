import { exec } from "child_process";
import {
  Exception,
  DownloadException,
  GenericException,
} from "./Exceptions.js";

export default class SysOperations {
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
      /*
      const git = spawn(
        "git",
        [
          "clone",
          `https://github.com/${pluginName}`,
          `./installed/${nameSplitted}`,
        ]);

        console.log("download started")
      git.stderr.on("data", (data) => console.log(`${data}`));
      git.on("close", (code) => console.log(`Finished with code ${code}`));

      return Promise.resolve("Download finished");
      */
    } catch (err: any) {
      return Promise.reject(
        err instanceof Error
          ? new GenericException(err.message)
          : new DownloadException(err)
      );
    }
  }

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
