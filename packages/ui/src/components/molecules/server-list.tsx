/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { serverIndexAtom } from "@/atoms/server";
import { serversFilteredAtom } from "@/atoms/server/servers";
import { Button } from "@/components/ui/button";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { ServerInfo } from "@/types/server-info";
import {
  CaretSortIcon,
  LockClosedIcon,
  LockOpen1Icon,
} from "@radix-ui/react-icons";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useAtom, useAtomValue } from "jotai";
import * as React from "react";

const columns: ColumnDef<ServerInfo>[] = [
  {
    id: "password",
    header: "",
    accessorFn: (data) => data.passworded ?? false,
    cell: ({ cell }) =>
      cell.getValue() ? (
        <LockClosedIcon className="h-4 w-4 text-red-400" />
      ) : (
        <LockOpen1Icon className="h-4 w-4 text-green-400" />
      ),
  },
  {
    id: "hostname",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        HostName
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: (data) => data.hostname ?? data.address,
  },
  {
    id: "players",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Players
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: ({ online, maxplayers }) =>
      online !== undefined && maxplayers !== undefined
        ? `${String(online)}/${String(maxplayers)}`
        : "-",
  },
  {
    id: "ping",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Ping
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: (data) => data.ping ?? "-",
    enableSorting: true,
  },
  {
    id: "mode",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Mode
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: (data) => data.gamemode ?? "-",
  },
  {
    id: "language",
    header: ({ column }) => (
      <Button
        variant="ghost"
        onClick={() => {
          column.toggleSorting(column.getIsSorted() === "asc");
        }}
      >
        Language
        <CaretSortIcon className="ml-2 h-4 w-4" />
      </Button>
    ),
    accessorFn: (data) => data.mapname ?? "-",
  },
];

export default function ServerList() {
  const servers = useAtomValue(serversFilteredAtom);
  const [serverIndex, setServerIndex] = useAtom(serverIndexAtom);

  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data: servers,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <ScrollArea className="h-[calc(100vh-88px)]">
      <ScrollBar orientation="vertical" />
      <ScrollBar orientation="horizontal" />
      <Table className="whitespace-nowrap text-xs">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
                className={cn(
                  serverIndex === row.index
                    ? "bg-muted"
                    : "text-muted-foreground",
                )}
                onClick={() => {
                  setServerIndex(row.index);
                }}
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </ScrollArea>
  );
}
