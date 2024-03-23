/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { serverIndexAtom } from ".";
import { serversInfoAtom } from "./servers";
import { atom } from "jotai";

export const serverHostAtom = atom((get) => {
  const servers = get(serversInfoAtom);
  const index = get(serverIndexAtom);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return servers[index] ?? null;
});
