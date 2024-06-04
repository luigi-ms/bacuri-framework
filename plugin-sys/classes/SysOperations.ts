import { spawn } from "child_process";
import hostedGitInfo from "hosted-git-info";
import { Exception, DownloadException, GenericException } from "../exceptions";

export default class SysOperations {
  public static async download(pluginName: string): Promise<void | Exception> {
    const nameSplitted: string = pluginName.split("/")[1];

    try {
      const git = spawn(
        "git",
        [
          "clone",
          `https://github.com/${pluginName}`,
          `./installed/${nameSplitted}`,
        ],
        { stdio: ["ignore", "pipe", "pipe"] }
      );

      git.stderr.on("data", (data) => console.error(`${data}`));
      git.on("close", (code) => console.log(`Finished with code ${code}`));
    } catch (err: any) {
      return Promise.reject(
        err instanceof Error
          ? new GenericException(err.message)
          : new DownloadException(err)
      );
    }
  }

  public static async existsInRemote(pluginName: string): Promise<boolean> {
    const info = hostedGitInfo.fromUrl(`git@github.com:${pluginName}`);

    return (info) ? true : false;
  }
}
