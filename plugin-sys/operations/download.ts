import { spawn } from "child_process";
import { promises } from "fs";
import PlugIn from "../classes/PlugIn";

type InfoJSON = {
  name: string;
  description: string;
  author: string;
  version: string;
  stylePath: string;
};

async function readInfoFile(pluginName: string): Promise<InfoJSON> {
  const folderPath: string = `installed/${pluginName.split("/")[1]}`;
  let handler;

  try {
    handler = await promises.open(`${folderPath}/info.json`);
    const reader: string = await handler.readFile("utf8");
    const json: InfoJSON = await JSON.parse(reader);

    return json;
  } catch (err) {
    throw new Error(`Error: ${err}`);
  } finally {
    handler?.close();
  }
}

export default async function downloadPlugin(
  pluginName: string
): Promise<PlugIn | Error> {
  const nameSplitted: string = pluginName.split("/")[1];
  let clone;

  try {
    clone = spawn("git", [
      "clone",
      `https://github.com/${pluginName}`,
      `./installed/${nameSplitted}`,
    ]);

    clone.stdout.on("data", () => console.log("Downloading..."));

    const file: InfoJSON = await readInfoFile(pluginName);

    return Promise.resolve(new PlugIn(file.name, file.description));
  } catch (err) {
    clone?.stderr.on("data", (data) => console.error(`stderr: ${data}`));
    return Promise.reject(new Error(`Error while downloading your plugin: ${err}`));
  } finally {
    clone?.on("close", (code) => console.log(`$Finishing with code ${code}`));
  }
}
