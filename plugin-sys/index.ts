import PlugInList from "./classes/PlugInList.js";
import { Options, Main } from "./classes/Main.js";

const main = new Main(new PlugInList());

const args: Array<string> = process.argv;
const opt: string = args[2];
const plugin: string = args[3];

if (opt === Options.Add) {
  main.add(plugin);
} else if (opt === Options.Init) {
  main.start();
} else if (opt === Options.Pull) {
  main.pull();
} else if (opt === Options.Update) {
  main.upd();
} else if (opt === Options.Remove) {
  main.del();
} else if (opt === Options.Help) {
  main.help();
} else if (opt === Options.Version) {
  main.getVersion();
} else if (opt === Options.Save) {
  main.save(plugin);
}
