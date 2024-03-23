/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { contextBridge, ipcRenderer } from "electron";

contextBridge.exposeInMainWorld("api", {
  platform: process.platform,
  arch: process.arch,
  receive: (channel: string, func: (...args: any[]) => void) => {
    const subscription = (event: any, ...args: any) => {
      func(...args);
    };
    ipcRenderer.on(channel, subscription);
    return () => {
      ipcRenderer.removeListener(channel, subscription);
    };
  },
  send: (channel: string, ...args: any) => {
    ipcRenderer.send(channel, ...args);
  },
  invoke: async (channel: string, ...args: any[]) =>
    ipcRenderer.invoke(channel, ...args),
});
