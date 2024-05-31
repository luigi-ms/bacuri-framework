import PlugIn from "./classes/PlugIn";

declare function downloadPlugin(pluginName: string): PlugIn;
declare function updatePlugin(pluginName: string): PlugIn;
declare function erasePlugin(): void;
declare function existsInLocal(pluginName: string): boolean;
declare function existsInRemote(pluginName: string): boolean;
