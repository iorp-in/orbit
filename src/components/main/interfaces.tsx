import React from "react";
import { TransitionProps } from "@material-ui/core/transitions";
import Slide from "@material-ui/core/Slide";

export const Transition = React.forwardRef(function Transition(props: TransitionProps, ref: React.Ref<unknown>) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

export interface IServerColumn {
  id: "lock" | "hostname" | "players" | "ping" | "gamemode" | "language";
  label: string;
  align?: "right";
  icon?: JSX.Element;
  format?: (value: number) => string;
}

export const columns: IServerColumn[] = [
  {
    id: "lock",
    label: "",
    icon: (
      <div style={{ textAlign: "center" }}>
        <svg width="10" height="12" viewBox="0 0 10 12" fill="#ABABAB" xmlns="http://www.w3.org/2000/svg">
          <path d="M6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8Z" />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M2 3C2 1.34315 3.34315 0 5 0C6.65685 0 8 1.34315 8 3V4C9.10457 4 10 4.89543 10 6V10C10 11.1046 9.10457 12 8 12H2C0.89543 12 0 11.1046 0 10V6C0 4.89543 0.895432 4 2 4V3ZM2 5C1.44772 5 1 5.44772 1 6V10C1 10.5523 1.44772 11 2 11H8C8.55228 11 9 10.5523 9 10V6C9 5.44772 8.55228 5 8 5H2ZM7 4H3V3C3 1.89543 3.89543 1 5 1C6.10457 1 7 1.89543 7 3V4Z"
          />
        </svg>
      </div>
    ),
  },
  { id: "hostname", label: "Servername" },
  { id: "players", label: "Player" },
  { id: "ping", label: "Ping" },
  { id: "gamemode", label: "Gamemode" },
  { id: "language", label: "Language" },
];

export interface IServerData {
  hostname: string;
  lock: boolean;
  address: string;
  onlinePlayers: number;
  maxPlayers: number;
  players: string;
  ping: number;
  gamemode: string;
  language: string;
  map: string;
  web: string;
  group: string;
  playersList: IPlayers[];
}

export interface IPlayers {
  id: number;
  name: string;
  ping: number;
  score: number;
}

export function createData(
  lock: boolean,
  hostname: string,
  address: string,
  players: string,
  ping: number,
  gamemode: string,
  language: string,
  playersList: IPlayers[],
  map: string,
  web: string,
  group: string,
  onlinePlayers: number,
  maxPlayers: number
): IServerData {
  return { hostname, lock, address, players, ping, gamemode, language, playersList, map, web, group, onlinePlayers, maxPlayers };
}

export interface IServers {
  groupid: string;
  list: string;
}

export interface ISettings {
  id: string;
  value: string;
}
