import { promises } from "fs";
import {
  Exception,
  GenericException,
  NoFileException,
  ReadFileException,
} from "./Exceptions.js";
import PlugIn from "./PlugIn.js";

type InfoJSON = {
  name: string;
  description: string;
  author: string;
  version: string;
  stylePath: string;
};

export default class RegistryManagement {
  constructor() {}

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

  public async addToRegistry(pl: PlugIn): Promise<void> {
    try {
      const reader: string = await promises.readFile("./registry.json", "utf8");
      const registry = JSON.parse(reader);

      registry.list.push([pl.name, pl]);

      //get error code
      await promises.writeFile("./registry.json", JSON.stringify(registry));
    } catch (err) {
      console.error(err instanceof Exception ? err.getResume() : err);
    }
  }

  public async removeFromRegistry(pl: PlugIn): Promise<void> {
    try {
      const reader: string = await promises.readFile("./registry.json", "utf8");
      const registry = JSON.parse(reader);

      const updated = registry.list.filter((p: PlugIn) => p.name !== pl.name)

      //get error code
      await promises.writeFile("./registry.json", JSON.stringify(updated));
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

  public static async syncronize(): Promise<Map<string, PlugIn>> {
    try {
      const reader: string = await promises.readFile("./registry.json", "utf8");
      const registry = JSON.parse(reader);

      return Promise.resolve(new Map(registry.list)); 
    } catch (err: any) {
      return (err instanceof Error) 
        ? Promise.reject(new GenericException(err.message))
        : Promise.reject(new ReadFileException(err));
    }
  }

  public async removeFromDir(folderName: string): Promise<void> {
    try{ 
      await promises.rm(`./installed/${folderName}`, { recursive: true })
    }catch(err){
      console.error(err)
    }
  }
}
