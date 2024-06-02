import { exec } from "child_process";
import { promises } from "fs";
import util from "util";
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
): Promise<string | Exception> {
  const nameSplitted: string = pluginName.split("/")[1];

  try {
    const command: string = `git clone https://github.com/${pluginName} ./installed/${nameSplitted}`;
    const run = util.promisify(exec);
    const { stdout, stderr } = await run(command);
    //Apparently they are sharing the same Buffer
    //need to solve this by creating a separate Buffer.
    if(stderr.length === 0){
      return Promise.resolve(stdout);
    }else{ 
      throw stderr;
    }
  } catch (err: any) {
    return Promise.reject(
      (err instanceof Error)
        ? new GenericException(err.message)
        : new DownloadException(err)
    );
  }
}
