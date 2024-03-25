/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { DefaultGroupKey, groupIndexAtom } from "@/atoms/group";
import {
  GroupActionType,
  groupsAtom,
  groupsAtomReducer,
} from "@/atoms/group/groups";
import {
  FavoritesServerActionType,
  serverFavoritesAtom,
  serverFavoritesAtomReducer,
} from "@/atoms/server/favorites";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { connectServer } from "@/lib/samp";
import { ServerInfo } from "@/types/server-info";
import { useAtomValue } from "jotai";
import { useReducerAtom } from "jotai/utils";
import React from "react";
import { toast } from "sonner";

export default function ServerContextMenu({
  children,
  server,
  serverIndex,
}: {
  children: React.ReactNode;
  server: ServerInfo;
  serverIndex: number;
}) {
  const groupIndex = useAtomValue(groupIndexAtom);
  const isFavorites = groupIndex === DefaultGroupKey.Favorites;
  const isHosted = groupIndex === DefaultGroupKey.Hosted;

  const [, groupsDispatch] = useReducerAtom(groupsAtom, groupsAtomReducer);
  const [, favoritesDispatch] = useReducerAtom(
    serverFavoritesAtom,
    serverFavoritesAtomReducer,
  );

  const handleConnect = () => {
    void connectServer(server);
    toast.success(`Connecting to ${server.hostname ?? server.address}`);
  };

  const handleCopyServerAddress = () => {
    void navigator.clipboard.writeText(server.address);
    toast.success("Server address copied to clipboard");
  };

  const handleAddToFavorites = () => {
    favoritesDispatch({
      address: server.address,
      type: FavoritesServerActionType.ADD,
    });
    toast.success(`Added ${server.hostname ?? server.address} to favorites`);
  };

  const handleDelete = () => {
    if (isFavorites) {
      favoritesDispatch({
        serverId: serverIndex,
        type: FavoritesServerActionType.REMOVE,
      });
    } else {
      groupsDispatch({
        groupId: groupIndex,
        serverId: serverIndex,
        type: GroupActionType.REMOVE_SERVER,
      });
    }

    toast.success(`Deleted ${server.hostname ?? server.address}`);
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>{children}</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleConnect}>Connect</ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem disabled={isFavorites} onClick={handleAddToFavorites}>
          Add to favorites
        </ContextMenuItem>
        <ContextMenuItem disabled={isHosted} onClick={handleDelete}>
          Delete server
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem onClick={handleCopyServerAddress}>
          Copy server address
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
}
