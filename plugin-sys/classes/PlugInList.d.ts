import PlugIn from "./PlugIn";
export default class PlugInList {
    protected _list: Map<string, PlugIn>;
    protected _length: number;
    constructor();
    add(pluginName: string): void;
    update(oldPlugin: PlugIn): void;
    del(pluginID: string): void | Error;
    searchByName(pluginName: string): PlugIn | Error;
    get list(): Map<string, PlugIn>;
    get length(): number;
}
