import { promises } from "fs";
import { Exception, NoFileException, ReadFileException } from "./Exceptions.js";
import PlugIn from "./PlugIn.js";

type InfoJSON = {
  name: string;
  description: string;
  author: string;
  version: string;
  stylePath: string;
};

export default class RegistryManagement {
  constructor(){}

  public async readManifest(pluginName: string): Promise<InfoJSON> {
    const folderPath: string = `installed/${pluginName}`;

    try {
      const reader: string = await promises.readFile(
        `${folderPath}/info.json`,
        { encoding: "utf8" }
      );
      console.log(reader);
      const json: InfoJSON = await JSON.parse(reader);

      return Promise.resolve(json);
    } catch (err: any) {
      const details: string = err ? err.message : "";

      return Promise.reject(new ReadFileException(details));
    }
  }

  public async updateRegistry(pl: PlugIn): Promise<void> {
    try {
      const reader: string = await promises.readFile("./registry.json","utf8");
      const registry = JSON.parse(reader);

      registry.list.push(pl);

      //get error code
      await promises.writeFile("./registry.json", JSON.stringify(registry));
    } catch (err) {
      console.error(err instanceof Exception ? err.getResume() : err);
    }
  }

  public async savePluginName(pluginName: string): Promise<void> {
    try {
      await promises.writeFile("./.temp", pluginName);
    } catch (err) {
      console.error(err);
    }
  }

  public async searchInDir(name: string): Promise<string | Exception> {
    try {
      const installed: Array<string> = await promises.readdir("./installed");
      const result: string = installed.filter(
        (file: string) => file === name
      )[0];

      if (result === "") throw new NoFileException();

      return Promise.resolve(result);
    } catch (err: any) {
      const details: string = err ? err.message : "";

      return Promise.reject(new ReadFileException(details));
    }
  }

  public async createFile(fileName: string, content: string): Promise<void> {
    try {
      await promises.writeFile(fileName, content);
    } catch (err) {
      console.error(err);
    }
  }

  public syncronize(): Map<number, PlugIn> {
    const synced: Map<number, PlugIn> = new Map();
    // 1. Convert registry to JSON object
    // 2. Loop over JSON
    // 3. Get ID attr, then
    // go like map.set(p.id, ...p)
    return synced;
  }

  /*
  public mapToJSON(map: Map<string, PlugIn>): void {
    //let template = { id: "0", pl: new PlugIn("", "") };
  }

  public static async existsInLocal(pluginName?: string): Promise<boolean> {
    return true;
  }*/
}
