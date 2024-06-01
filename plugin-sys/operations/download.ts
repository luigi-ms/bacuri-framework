import { spawn } from "child_process";
import { open } from "fs/promises";
import PlugIn from "../classes/PlugIn";

async function readInfoFile(pluginName: string): Promise<PlugIn> {
  const folderPath: string = `installed/${pluginName.split("/")[1]}`;
  let handler;

  try{
    handler = await open(`${folderPath}/info.json`);
    const reader = await handler.readFile("utf8");
    const json = await JSON.parse(reader);
    const plugin: PlugIn = new PlugIn(json.name, json.description);

    return plugin;
  }catch{
    throw new Error("Error while processing this file");
  }finally{
    handler?.close();
  }
}

export default async function downloadPlugin(pluginName: string): Promise<PlugIn> {
  const nameSplitted: string[] = pluginName.split("/");

  /* 1 Execute a git clone
   * 2 Create a PlugIn object
   * 3 Add to PlugInList object
   * 4 Register in installed.json
   *  Plugins must have a file detailing it */
  let clone;
  
  try{
    clone = spawn("git", [
      "clone",
      `https://github.com/${pluginName}`,
      `./installed/${nameSplitted[1]}`,
    ]);

    clone.stdout.on("data", () => {});
  }catch{
    clone?.stderr.on("data", (data) => console.error(`stderr: ${data}`));
  }finally{
    clone?.on("close", (code) => console.log(`${code}: Finished!`));  
  }
}

//downloadPlugin("luigi-ms/pluginTest");
readInfoFile("luigi-ms/pluginTest");
