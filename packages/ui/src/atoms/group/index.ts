/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { atomWithStorage } from "jotai/utils";

export const DefaultGroupKey = {
  Favorites: -2,
  Hosted: -1,
} as const;

export const groupIndexAtom = atomWithStorage("selected-group", -2);
