/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import RenameGroup from "../dialogs/rename-group";
import { DefaultGroupKey, groupIndexAtom } from "@/atoms/group";
import {
  GroupActionType,
  groupsAtomReducer,
  groupsAtom,
} from "@/atoms/group/groups";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { useAtom } from "jotai";
import { useReducerAtom } from "jotai/utils";
import React from "react";

export default function GroupContextMenu({
  children,
  groupId,
}: {
  children: React.ReactNode;
  groupId: number;
}) {
  const [groupIndex, setGroupIndex] = useAtom(groupIndexAtom);
  const [groups, dispatch] = useReducerAtom(groupsAtom, groupsAtomReducer);

  const handleRename = async () => {
    const name = await RenameGroup(groupId, groups[groupId]?.name ?? "");
    if (name) {
      dispatch({
        groupId,
        name,
        type: GroupActionType.RENAME,
      });
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem
          inset
          onClick={() => {
            void handleRename();
          }}
        >
          Rename
        </ContextMenuItem>
        <ContextMenuItem
          inset
          onClick={() => {
            if (groupIndex === groupId) {
              setGroupIndex(DefaultGroupKey.Favorites);
            }

            dispatch({
              groupId,
              type: GroupActionType.REMOVE,
            });
          }}
        >
          Delete
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
