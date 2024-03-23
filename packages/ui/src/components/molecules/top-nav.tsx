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
import { serverSearchFilterAtom } from "@/atoms/server/filters";
import { serverAtom } from "@/atoms/server/server";
import { serversAtom } from "@/atoms/server/servers";
import { usernameAtom } from "@/atoms/username";
import api from "@/lib/api";
import { Alert } from "@/lib/dialog";
import { launchSamp } from "@/lib/electron";
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

export default function TopNav() {
  const serverIndex = useAtomValue(serverIndexAtom);
  const groupIndex = useAtomValue(groupIndexAtom);
  const server = useAtomValue(serverAtom);
  const servers = useAtomValue(serversAtom);
  const folder = useAtomValue(GTAFolderAtom);
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

  const handleConnect = async () => {
    try {
      if (!server) {
        return;
      }

      const gta_sa = `${folder}\\gta_sa.exe`;
      const samp = `${folder}\\samp.exe`;

      const isGtaSaExist = await api?.invoke("path-exist", gta_sa);
      const isSampExist = await api?.invoke("path-exist", samp);

      if (!isGtaSaExist) {
        throw new Error("GTA_SA.EXE not found in the selected folder.");
      }

      if (!isSampExist) {
        throw new Error("SAMP.EXE not found in the selected folder.");
      }

      await launchSamp({
        address: server.address,
        username,
        gta_sa,
        samp,
      });
    } catch (error) {
      console.error("Error occurred during folder selection:", error);
      let errorMessage = "An unknown error occurred.";
      if (error instanceof Error && error.message) {
        errorMessage = error.message;
      }

      void Alert({
        title: "Error",
        description: errorMessage,
        showCancel: false,
      });
    }
  };

  const handleRefresh = () => {
    servers.forEach((address) => {
      void api?.invoke("server-info", address, true);
    });
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
  };

  return (
    <div className="flex items-center gap-2">
      <Input
        placeholder="Search server"
        className="max-w-[150px]"
        onChange={(e) => {
          setSearch(e.target.value);
        }}
      />

      <Button
        size="sm"
        variant="ghost"
        disabled={!canConnect}
        onClick={() => {
          void handleConnect();
        }}
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
        className="max-w-[150px]"
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
                <MixerHorizontalIcon className="h-4 w-4" />
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
