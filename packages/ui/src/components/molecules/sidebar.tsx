/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import GroupContextMenu from "../context-menu/group-context-menu";
import { ScrollArea } from "../ui/scroll-area";
import { DefaultGroupKey, groupIndexAtom } from "@/atoms/group";
import { groupsAtom } from "@/atoms/group/groups";
import AddGroup from "@/components/dialogs/add-group";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArchiveIcon,
  CubeIcon,
  HeartIcon,
  PlusIcon,
} from "@radix-ui/react-icons";
import { useAtom, useAtomValue } from "jotai";
import React from "react";

export function Sidebar() {
  const groups = useAtomValue(groupsAtom);

  const [groupIndex, setGroupIndex] = useAtom(groupIndexAtom);

  const renderGroups = () => {
    return groups.map((group, groupId) => (
      <GroupContextMenu groupId={groupId} key={`group-${String(groupId)}`}>
        <Button
          variant="ghost"
          size="sm"
          className={cn("justify-start font-normal", {
            "bg-secondary": groupIndex === groupId,
          })}
          onClick={() => {
            setGroupIndex(groupId);
          }}
        >
          <ArchiveIcon className="mr-4 h-4 w-4" />
          <span>{group.name}</span>
        </Button>
      </GroupContextMenu>
    ));
  };

  return (
    <>
      <div className="h-[calc(100vh-88px)] space-y-2 p-2">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-2">
            <Button
              variant="ghost"
              size="sm"
              className={cn("justify-start font-normal", {
                "bg-secondary": groupIndex === DefaultGroupKey.Favorites,
              })}
              onClick={() => {
                setGroupIndex(DefaultGroupKey.Favorites);
              }}
            >
              <HeartIcon className="mr-4 h-4 w-4" />
              <span>Favorites</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className={cn("justify-start font-normal", {
                "bg-secondary": groupIndex === DefaultGroupKey.Hosted,
              })}
              onClick={() => {
                setGroupIndex(DefaultGroupKey.Hosted);
              }}
            >
              <CubeIcon className="mr-4 h-4 w-4" />
              <span>Hosted</span>
            </Button>
            {renderGroups()}
            <AddGroup>
              <Button
                size="sm"
                variant="ghost"
                className="justify-start font-normal"
              >
                <PlusIcon className="mr-4 h-4 w-4" />
                <span>Add Group</span>
              </Button>
            </AddGroup>
          </div>
        </ScrollArea>
      </div>
    </>
  );
}
