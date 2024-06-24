/**
 * @fileoverview Processes the given args
 * @author Luigi Moraes
 * **/

import PlugInList from "./classes/PlugInList.js";
import { Options, Main } from "./classes/Main.js";
import RegistryManagement from "./classes/RegistryManagement.js";
import { Exception } from "./classes/Exceptions.js";

/**
 * @description Gets an updated version from registry.json
 * then calls the necessary method. The options that does
 * not need the registry info goes in the finally() scope
 **/

const args: Array<string> = process.argv;
const opt: string = args[2];
const plugin: string = args[3];

RegistryManagement.syncronize()
  .then((map) => {
    const main = new Main(new PlugInList(map));

    if (opt === Options.Add) {
      main.add(plugin);
    } else if (opt === Options.Save) {
      main.save(plugin);
    } else if (opt === Options.Pull) {
      main.pull(plugin);
    } else if (opt === Options.Update) {
      main.upd(plugin);
    } else if (opt === Options.Remove) {
      main.del(plugin);
    }
  })
  .catch((rej: Exception) => console.error(rej.getResume()))
  .finally(() => {
    const main = new Main(new PlugInList());

    if (opt === Options.Help) {
      main.help();
    } else if (opt === Options.Version) {
      main.getVersion();
    } else if (opt === Options.Init) {
      main.start();
    }
  });
