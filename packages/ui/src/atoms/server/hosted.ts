/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { atom } from "jotai";
import { loadable } from "jotai/utils";

export const serverHostedAtom = atom(async () => {
  try {
    const response = await fetch(
      "https://raw.githubusercontent.com/samarmeena/orbit/main/hosted_tab.txt",
    );

    const body = await response.text();
    return body
      .split("\n")
      .filter((t) => t.length > 0)
      .sort(() => Math.random() - 0.5);
  } catch (err) {
    return [];
  }
});

export const serverHostedLoadableAtom = loadable(serverHostedAtom);
