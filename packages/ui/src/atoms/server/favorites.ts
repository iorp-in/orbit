/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { atomWithStorage } from "jotai/utils";

export const serverFavoritesAtom = atomWithStorage<string[]>(
  "favorites-servers",
  [],
);

export enum FavoritesServerActionType {
  ADD = "add",
  REMOVE = "remove",
}

type AddAction = {
  address: string;
  type: FavoritesServerActionType.ADD;
};

type RemoveAction = {
  serverId: number;
  type: FavoritesServerActionType.REMOVE;
};

type Actions = AddAction | RemoveAction;

export const serverFavoritesAtomReducer = (prev: string[], action: Actions) => {
  const arr = [...prev];

  switch (action.type) {
    case FavoritesServerActionType.ADD: {
      arr.push(action.address);
      break;
    }

    case FavoritesServerActionType.REMOVE: {
      arr.splice(action.serverId, 1);
      break;
    }
  }

  return arr;
};
