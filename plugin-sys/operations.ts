/* All file tree related operations must go here
 * These functions are the bridge between
 * the file tree and the Github,
 * where the plugins are stored */

import hostedGitInfo from "hosted-git-info";
import PlugIn from "./classes/PlugIn";
export function updatePlugin(pluginName: string): PlugIn {
  return new PlugIn(pluginName, "");
}

export function erasePlugin(): void {}

export function existsInLocal(pluginName: string): boolean {
  return true;
}

export function existsInRemote(pluginName: string): boolean {
  const info = hostedGitInfo.fromUrl(`git@github.com:${pluginName}`);

  return (info) ? true : false;
}
