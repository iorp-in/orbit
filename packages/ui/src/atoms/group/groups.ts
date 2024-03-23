/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { atomWithStorage } from "jotai/utils";

export interface Group {
  name: string;
  servers: string[];
}

export const groupsAtom = atomWithStorage<Group[]>("groups", []);

export enum GroupActionType {
  ADD = "add",
  ADD_SERVER = "add-server",
  REMOVE = "remove",
  REMOVE_SERVER = "remove-server",
  RENAME = "rename",
}

type AddAction = {
  name: string;
  type: GroupActionType.ADD;
};

type AddServerAction = {
  hostname: string;
  groupId: number;
  type: GroupActionType.ADD_SERVER;
};

type RemoveAction = {
  groupId: number;
  type: GroupActionType.REMOVE;
};

type RemoveServerAction = {
  serverId: number;
  groupId: number;
  type: GroupActionType.REMOVE_SERVER;
};

type RenameAction = {
  groupId: number;
  name: string;
  type: GroupActionType.RENAME;
};

type Actions =
  | AddAction
  | AddServerAction
  | RemoveAction
  | RemoveServerAction
  | RenameAction;

export const groupsAtomReducer = (prev: Group[], action: Actions) => {
  const arr = [...prev];

  switch (action.type) {
    case GroupActionType.ADD: {
      arr.push({
        name: action.name,
        servers: [],
      });
      break;
    }

    case GroupActionType.ADD_SERVER: {
      const servers = arr[action.groupId]?.servers;
      if (servers) {
        servers.push(action.hostname);
      }
      break;
    }

    case GroupActionType.REMOVE: {
      arr.splice(action.groupId, 1);
      break;
    }

    case GroupActionType.REMOVE_SERVER: {
      const servers = arr[action.groupId]?.servers;
      if (servers) {
        servers.splice(action.serverId, 1);
      }
      break;
    }

    case GroupActionType.RENAME: {
      const item = arr[action.groupId];
      if (item) {
        item.name = action.name;
      }
      break;
    }
  }

  return arr;
};
