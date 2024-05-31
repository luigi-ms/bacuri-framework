import { spawn } from "child_process";
import PlugIn from "../classes/PlugIn";

function readInfoFile(pluginName: string): void {
  //Reads the recently installed plugin and
  //creates an object
}

export default function downloadPlugin(pluginName: string): PlugIn {
  const nameSplitted: string[] = pluginName.split('/');

  /* 1 Execute a git clone
   * 2 Create a PlugIn object
   * 3 Add to PlugInList object
   * 4 Register in installed.json
  *  Plugins must have a file detailing it */

  try{
    const clone = spawn("git", ["clone", `https://github.com/${pluginName}`, `./installed/${nameSplitted[1]}`]);

    clone.stdout.on('data', (data) => {
      console.log(data);
    });

    clone.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    clone.on('close', (code) => {
      console.log(`${code}: Finished!`);
    });
  }catch(err: any){
    console.error(`Error: ${err}`);
  }
  
  return new PlugIn(pluginName, "");
}

downloadPlugin("luigi-ms/pluginTest");
