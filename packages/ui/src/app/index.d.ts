/*
 * --------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------
 */
export {};

export type ElectronApi = {
  platform: string;
  receive: (channel: string, callback: any) => () => void;
  send: (channel: string, ...args: any[]) => any;
  invoke: (channel: string, ...args: any[]) => Promise<any>;
};

declare global {
  interface Window {
    api: ElectronApi;
  }
}
