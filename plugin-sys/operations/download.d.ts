import PlugIn from "../classes/PlugIn";

declare type InfoJSON = {
  name: string,
  description: string,
  author: string,
  version: string,
  stylePath: string
};

declare function readInfoFile(pluginName: string): Promise<PlugIn>;

export default function downloadPlugin(pluginName: string): PlugIn;
