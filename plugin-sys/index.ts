/* Main menu, where user interacts with the System
 * All visual interactions must go here */

import * as readline from "readline";
import {
//  existsInLocal,
  existsInRemote
} from "./operations";
import PlugInList from "./classes/PlugInList";

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
    console.log("Please wait while we look for this it");
    if (existsInRemote(pluginName)) {
      console.log("Downloading...");
      list.add(pluginName)
        .then(() => console.log("Success!"))
        .catch(rej => console.error(`${rej}`));
    } else {
      console.error(`Sorry, look like ${pluginName} is not available :(`);
    }
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
