interface Exception {
  _code: string;
  _name: string;
  _message: string;
  details: string;
}

declare type InfoJSON = {
  name: string,
  description: string,
  author: string,
  version: string,
  stylePath: string
};

declare function readInfoFile(pluginName: string): Promise<InfoJSON>;

declare function downloadPlugin(pluginName: string): Promise<string | Exception>;
