/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { serverIndexAtom } from ".";
import { serversFilteredAtom } from "./servers";
import { atom } from "jotai";

export const serverAtom = atom((get) => {
  const servers = get(serversFilteredAtom);
  const index = get(serverIndexAtom);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return servers[index] ?? null;
});
