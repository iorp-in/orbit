/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { DefaultGroupKey, groupIndexAtom } from "../group";
import { groupServersAtom } from "../group/server";
import { serverFavoritesAtom } from "./favorites";
import {
  serverLanguageFilterAtom,
  serverModeFilterAtom,
  serverNotEmptyFilterAtom,
  serverNotFullFilterAtom,
  serverNotPasswordFilterAtom,
  serverNotPingFilterAtom,
  serverSearchFilterAtom,
} from "./filters";
import { serverHostedLoadableAtom } from "./hosted";
import { serverInfoAtom } from "./info";
import { ServerInfo } from "@/types/server-info";
import { atom } from "jotai";

export const serversAtom = atom<string[]>((get) => {
  const groupIndex = get(groupIndexAtom);

  if (groupIndex === DefaultGroupKey.Favorites) {
    return get(serverFavoritesAtom);
  }

  if (groupIndex === DefaultGroupKey.Hosted) {
    const data = get(serverHostedLoadableAtom);
    if (data.state === "hasData") {
      return data.data;
    } else {
      return [];
    }
  }

  return get(groupServersAtom);
});

export const serversInfoAtom = atom((get) => {
  const raw = get(serversAtom);
  const servers = raw.map((address): ServerInfo => {
    return (
      get(serverInfoAtom({ address })) ?? {
        address,
      }
    );
  });

  return servers;
});

export const serversFilteredAtom = atom((get) => {
  const servers = get(serversInfoAtom);

  const searchFilter = get(serverSearchFilterAtom).toLowerCase();
  const modeFilter = get(serverModeFilterAtom).toLowerCase();
  const languageFilter = get(serverLanguageFilterAtom).toLowerCase();
  const notEmptyFilter = get(serverNotEmptyFilterAtom);
  const notFullFilter = get(serverNotFullFilterAtom);
  const notPasswordFilter = get(serverNotPasswordFilterAtom);
  const notPingFilter = get(serverNotPingFilterAtom);

  return servers.filter(
    ({ hostname, mapname, gamemode, online, maxplayers, passworded, ping }) => {
      // Check if properties are defined before accessing them
      gamemode = gamemode?.toLowerCase() ?? "";
      hostname = hostname?.toLowerCase() ?? "";
      mapname = mapname?.toLowerCase() ?? "";
      passworded = passworded ?? false;
      online = online ?? 0;
      ping = ping ?? 0;

      // Apply filters
      const passesModeFilter = gamemode.includes(modeFilter);
      const passesSearchFilter = hostname.includes(searchFilter);
      const passesLanguageFilter = mapname.includes(languageFilter);
      const passesNotEmptyFilter = !notEmptyFilter || online !== 0;
      const passesNotFullFilter = !notFullFilter || online !== maxplayers;
      const passesNotPasswordFilter = !notPasswordFilter || !passworded;
      const passesNotPingFilter = !notPingFilter || ping !== 0;

      // Return true if all filters pass
      return (
        passesSearchFilter &&
        passesModeFilter &&
        passesLanguageFilter &&
        passesNotEmptyFilter &&
        passesNotFullFilter &&
        passesNotPasswordFilter &&
        passesNotPingFilter
      );
    },
  );
});
