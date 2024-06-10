import PlugInList from "./classes/PlugInList.js";
import SysOperations from "./classes/SysOperations.js";

const list = new PlugInList();

enum Options {
  Add = "-a",
  Pull = "-p",
  Update = "-u",
  Remove = "-r",
  Version = "-v",
  Help = "-h"
};

class Main {
  public static add(pluginName: string): void {
    console.log("Please wait while we look for it");
    SysOperations.existsInRemote(pluginName)
    .then(() => {
      console.warn("Your plugin was found!");
      console.log("Downloading...");
      list.add(pluginName); 
    })
    .catch(() => {
      console.error(`Sorry, looks like ${pluginName} is not available :(`);
    });
  }
  
  public static pull(): void {
    console.log('Retrieving');
  }

  public static upd(): void {
    console.log('updating');
  }

  public static del(): void {
    console.log('Removiing');
  }

  public static getVersion(): void {
    console.log('v0.1.0-alpha');
  }

  public static help(): void {
    console.log(`CocaiSS Plugin System utility
          -a [author/name] Downloads a new plugin
          -d [name] Removes a plugin
          -h Shows this help log
          -p [name] Retrieves info from installed plugin
          -u [author/name] Updates a plugin
          -v Shows version of this system`);
  }
}

const args: Array<string> = process.argv;
const opt: string = args[2];
const plugin: string = args[3];

if(opt === Options.Add){
  Main.add(plugin);
}else if(opt === Options.Pull){
  Main.pull(); 
}else if(opt === Options.Update){
  Main.upd();
}else if(opt === Options.Remove){
  Main.del();
}else if(opt === Options.Help){
  Main.help();
}else if(opt === Options.Version){
  Main.getVersion();
}
