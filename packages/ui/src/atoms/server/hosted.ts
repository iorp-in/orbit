/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { OpenMpServer } from "@/types/openmp-server";
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const serverHostedAtom = atom(async () => {
  try {
    const response = await fetch("https://api.open.mp/servers");
    const body = (await response.json()) as OpenMpServer[];
    return body.map((s) => s.ip).sort(() => Math.random() - 0.5);
  } catch (err) {
    return [];
  }
});

export const serverHostedLoadableAtom = loadable(serverHostedAtom);
