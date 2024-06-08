/* Main menu, where user interacts with the System
 * All visual interactions must go here */

//NOTE: Change to read options from command line

import * as readline from "readline";
import PlugInList from "./classes/PlugInList.js";
import SysOperations from "./classes/SysOperations.js";

const list: PlugInList = new PlugInList();
const r = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

console.log("Welcome to CocaiSS Plugin System!");
console.log(`Select an option below, and write the plugin's name
            1 - Install a new plugin
            2 - Update a plugin
            3 - Remove a plugin
            0 - Exit menu`);

r.question("(option plugin)= ", (answer: string) => {
  const opt: number = Number(answer.split(" ")[0]),
    pluginName: string = answer.split(" ")[1];

  if (opt === 1) {
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
  } else if (opt === 2) {
    console.log("updating");
  } else if (opt === 3) {
    console.log("removing");
  } else if (opt === 0) {
    console.log("See you later!");
    r.close();
  } else {
    console.log("Option unavailable");
  }
  r.close();
});
