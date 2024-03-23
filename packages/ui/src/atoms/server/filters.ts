/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { atom } from "jotai";

export const serverSearchFilterAtom = atom("");
export const serverModeFilterAtom = atom("");
export const serverLanguageFilterAtom = atom("");
export const serverNotFullFilterAtom = atom(false);
export const serverNotEmptyFilterAtom = atom(false);
export const serverNotPasswordFilterAtom = atom(false);
export const serverNotPingFilterAtom = atom(false);
