/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { groupIndexAtom } from ".";
import { groupsAtom } from "./groups";
import copy from "fast-copy";
import { atom } from "jotai";

export const groupServersAtom = atom((get) => {
  const groups = get(groupsAtom);
  const groupId = get(groupIndexAtom);

  return copy(groups[groupId]?.servers ?? []);
});
