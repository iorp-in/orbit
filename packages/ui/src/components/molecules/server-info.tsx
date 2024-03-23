/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";
import { serverAtom } from "@/atoms/server/server";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import api from "@/lib/api";
import { cn } from "@/lib/utils";
import { useAtomValue } from "jotai";

export default function ServerPlayerList() {
  const server = useAtomValue(serverAtom);

  const lagcomp = server?.rules?.["lagcomp"] ?? "-";
  const mapname = server?.rules?.["mapname"] ?? "-";
  const version = server?.rules?.["version"] ?? "-";
  const weather = server?.rules?.["weather"] ?? "-";
  const weburl = server?.rules?.["weburl"] ?? "-";
  const worldtime = server?.rules?.["worldtime"] ?? "-";

  return (
    <>
      <ScrollArea className="h-[calc(100vh-88px-237px)]">
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead>Player</TableHead>
              <TableHead>Score</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {server?.players?.map(({ name, score }, index) => (
              <TableRow key={`player-${index.toString()}`}>
                <TableCell>{name}</TableCell>
                <TableCell>{score}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </ScrollArea>
      <Separator />
      <div>
        <Table className="text-xs">
          <TableHeader>
            <TableRow>
              <TableHead>Rule</TableHead>
              <TableHead>Value</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>lagcomp</TableCell>
              <TableCell>{lagcomp}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>mapname</TableCell>
              <TableCell>{mapname}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>version</TableCell>
              <TableCell>{version}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>weather</TableCell>
              <TableCell>{weather}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>weburl</TableCell>
              <TableCell>
                <button
                  className={cn({
                    "text-blue-400 hover:underline": weburl !== "-",
                  })}
                  onClick={() => {
                    if (weburl !== "-") {
                      api?.send("open-link", `http://${String(weburl)}`);
                    }
                  }}
                >
                  {weburl}
                </button>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell>worldtime</TableCell>
              <TableCell>{worldtime}</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </>
  );
}
