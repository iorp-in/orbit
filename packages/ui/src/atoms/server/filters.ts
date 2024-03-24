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

export const isServerFilterAppliedAtom = atom((get) => {
  const mode = get(serverModeFilterAtom);
  const language = get(serverLanguageFilterAtom);
  const notFull = get(serverNotFullFilterAtom);
  const notEmpty = get(serverNotEmptyFilterAtom);
  const notPassword = get(serverNotPasswordFilterAtom);

  return (
    mode.length > 0 || language.length > 0 || notFull || notEmpty || notPassword
  );
});
