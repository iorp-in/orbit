/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import AboutPopup from "../dialogs/about";
import AddServer from "../dialogs/add-server";
import { FilterPopup } from "../dialogs/filter";
import SettingsPopup from "../dialogs/settings";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { DefaultGroupKey, groupIndexAtom } from "@/atoms/group";
import {
  groupsAtomReducer,
  groupsAtom,
  GroupActionType,
} from "@/atoms/group/groups";
import { GTAFolderAtom } from "@/atoms/gta-folder";
import { serverIndexAtom } from "@/atoms/server";
import {
  FavoritesServerActionType,
  serverFavoritesAtom,
  serverFavoritesAtomReducer,
} from "@/atoms/server/favorites";
import {
  isServerFilterAppliedAtom,
  serverSearchFilterAtom,
} from "@/atoms/server/filters";
import { serverAtom } from "@/atoms/server/server";
import { serversAtom } from "@/atoms/server/servers";
import { usernameAtom } from "@/atoms/username";
import api from "@/lib/api";
import { connectServer } from "@/lib/samp";
import {
  GearIcon,
  InfoCircledIcon,
  MixerHorizontalIcon,
  PlayIcon,
  PlusIcon,
  ReloadIcon,
  TrashIcon,
} from "@radix-ui/react-icons";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import { useReducerAtom } from "jotai/utils";
import { toast } from "sonner";

export default function TopNav() {
  const gta_folder = useAtomValue(GTAFolderAtom);
  const serverIndex = useAtomValue(serverIndexAtom);
  const groupIndex = useAtomValue(groupIndexAtom);
  const server = useAtomValue(serverAtom);
  const servers = useAtomValue(serversAtom);
  const isFilterApplied = useAtomValue(isServerFilterAppliedAtom);
  const setSearch = useSetAtom(serverSearchFilterAtom);

  const [username, setUsername] = useAtom(usernameAtom);
  const [, groupsDispatch] = useReducerAtom(groupsAtom, groupsAtomReducer);
  const [, favoritesDispatch] = useReducerAtom(
    serverFavoritesAtom,
    serverFavoritesAtomReducer,
  );

  const isFavorite = groupIndex === DefaultGroupKey.Favorites;
  const isHosted = groupIndex === DefaultGroupKey.Hosted;
  const canDelete = server !== null && !isHosted;
  const canConnect = server !== null;

  const handleConnect = () => {
    if (server) {
      void connectServer({ gta_folder, server, username });
      toast.success(`Connecting to ${server.hostname ?? server.address}`);
    }
  };

  const handleRefresh = () => {
    servers.forEach((address) => {
      void api?.invoke("server-info", address, true);
    });
    toast.success("Updating all server");
  };

  const handleDelete = () => {
    if (isFavorite) {
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

    if (server) {
      toast.success(`Deleted ${server.hostname ?? server.address}`);
    }
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Search server"
        className="max-w-[150px] shadow-none"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <Button
        size="sm"
        variant="ghost"
        disabled={!canConnect}
        onClick={handleConnect}
      >
        <PlayIcon className="mr-2 h-4 w-4" />
        <span>Connect</span>
      </Button>

      <AddServer>
        <Button size="icon" variant="ghost" disabled={isHosted}>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-full w-full items-center justify-center">
                <PlusIcon className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add server</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </AddServer>

      <Button
        size="icon"
        variant="ghost"
        disabled={!canDelete}
        onClick={handleDelete}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <div className="flex h-full w-full items-center justify-center">
              <TrashIcon className="h-4 w-4" />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>Delete server</p>
          </TooltipContent>
        </Tooltip>
      </Button>

      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            variant="ghost"
            disabled={!canConnect}
            onClick={handleRefresh}
          >
            <ReloadIcon className="h-4 w-4" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Refresh all server</p>
        </TooltipContent>
      </Tooltip>

      <SettingsPopup>
        <Button size="icon" variant="ghost">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-full w-full items-center justify-center">
                <GearIcon className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Settings</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </SettingsPopup>

      <span className="flex-1" />
      <Input
        placeholder="Nickname"
        className="max-w-[150px] shadow-none"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value);
        }}
      />

      <FilterPopup>
        <Button size="icon" variant="ghost">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-full w-full items-center justify-center">
                <div className="relative">
                  <MixerHorizontalIcon className="h-4 w-4" />
                  {isFilterApplied && (
                    <sup className="absolute -right-1 -top-1">
                      <div className="h-1 w-1 rounded-full bg-blue-400" />
                    </sup>
                  )}
                </div>
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Filters</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </FilterPopup>

      <AboutPopup>
        <Button size="icon" variant="ghost">
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex h-full w-full items-center justify-center">
                <InfoCircledIcon className="h-4 w-4" />
              </div>
            </TooltipTrigger>
            <TooltipContent>
              <p>About</p>
            </TooltipContent>
          </Tooltip>
        </Button>
      </AboutPopup>
    </div>
  );
}
