import { promises } from "fs";
import { Exception, ReadFileException } from "../exceptions";
import PlugIn from "./PlugIn";

type InfoJSON = {
  name: string;
  description: string;
  author: string;
  version: string;
  stylePath: string;
};

export default class FilesOperations {
  public static async readManifest(pluginName: string): Promise<InfoJSON> {
    const folderPath: string = `installed/${pluginName.split("/")[1]}`;
    let handler;

    try {
      handler = await promises.open(`${folderPath}/info.json`);
      const reader: string = await handler.readFile("utf8");
      const json: InfoJSON = await JSON.parse(reader);

      return json;
    } catch (err: any) {
      const details: string = err ? err.message : "";

      throw new ReadFileException(details);
    } finally {
      handler?.close();
    }
  }

  public static async updateRegistry(pl: PlugIn): Promise<void> {
    let handler;
    try {
      handler = await promises.open("./.registry.json");
      const reader: string = await handler.readFile("utf8");
      const registry = JSON.parse(reader);
      const newRegistry = JSON.stringify({ ...registry, pl });

      await handler.writeFile(newRegistry);
    } catch (err) {
      console.error(err instanceof Exception ? err.getResume() : err);
    } finally {
      handler?.close();
    }
  }

  public static async existsInLocal(pluginName?: string): Promise<boolean> {
    return true;
  }
}
