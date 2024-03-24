/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { serverIndexAtom } from "@/atoms/server";
import { serversFilteredAtom } from "@/atoms/server/servers";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { ServerInfo } from "@/types/server-info";
import { LockClosedIcon, LockOpen1Icon } from "@radix-ui/react-icons";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

const ServerRow = ({
  server,
  index,
}: {
  server: ServerInfo;
  index: number;
}) => {
  const [selected, setSelected] = useAtom(serverIndexAtom);

  const isSelected = selected === index;
  const {
    address,
    hostname,
    online,
    maxplayers,
    gamemode,
    mapname,
    ping,
    passworded = false,
  } = server;

  return (
    <TableRow
      onClick={() => {
        void api?.invoke("server-info", server, true);
        setSelected(index);
      }}
      className={cn({
        "bg-muted": isSelected,
        "text-muted-foreground": !isSelected,
      })}
    >
      <TableCell>
        {passworded ? (
          <LockClosedIcon className="h-4 w-4 text-red-400" />
        ) : (
          <LockOpen1Icon className="h-4 w-4 text-green-400" />
        )}
      </TableCell>
      <TableCell>{hostname ?? address}</TableCell>
      <TableCell>
        {online !== undefined && maxplayers !== undefined
          ? `${String(online)}/${String(maxplayers)}`
          : "-"}
      </TableCell>
      <TableCell>{ping ?? "-"}</TableCell>
      <TableCell>{gamemode ?? "-"}</TableCell>
      <TableCell>{mapname ?? "-"}</TableCell>
    </TableRow>
  );
};

export default function ServerList() {
  const servers = useAtomValue(serversFilteredAtom);

  const renderServers = () => {
    return servers.map((server, index) => (
      <ServerRow
        key={`server-${String(index)}`}
        server={server}
        index={index}
      />
    ));
  };

  return (
    <ScrollArea className="h-[calc(100vh-88px)]">
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
      <Table className="whitespace-nowrap text-xs">
        {servers.length === 0 && <TableCaption>No servers</TableCaption>}
        <TableHeader>
          <TableRow>
            <TableHead></TableHead>
            <TableHead>HostName</TableHead>
            <TableHead>Players</TableHead>
            <TableHead>Ping</TableHead>
            <TableHead>Mode</TableHead>
            <TableHead>Language</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>{renderServers()}</TableBody>
      </Table>
    </ScrollArea>
  );
}
