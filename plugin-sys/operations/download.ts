import { spawn } from "child_process";
import { promises } from "fs";
import {
  Exception,
  ReadFileException,
  DownloadException,
  GenericException,
} from "../exceptions";

type InfoJSON = {
  name: string;
  description: string;
  author: string;
  version: string;
  stylePath: string;
};

export async function readInfoFile(pluginName: string): Promise<InfoJSON> {
  const folderPath: string = `installed/${pluginName.split("/")[1]}`;
  let handler;

  try {
    handler = await promises.open(`${folderPath}/info.json`);
    const reader: string = await handler.readFile("utf8");
    const json: InfoJSON = await JSON.parse(reader);

    return json;
  } catch (err: any) {
    const details: string = err ? err.message : "";

    throw new ReadFileException(details);
  } finally {
    handler?.close();
  }
}

export async function downloadPlugin(
  pluginName: string
): Promise<void | Exception> {
  const nameSplitted: string = pluginName.split("/")[1];

  try {
    const git = spawn("git", ["clone", `https://github.com/${pluginName}`, `./installed/${nameSplitted}`], { stdio: ['ignore', 'pipe', 'pipe'] });

    git.stderr.on("data", (data) => console.error(`${data}`));
    git.on("close", (code) => console.log(`Finished with code ${code}`));
  } catch (err: any) {
    return Promise.reject(
      (err instanceof Error)
        ? new GenericException(err.message)
        : new DownloadException(err)
    );
  }
}
