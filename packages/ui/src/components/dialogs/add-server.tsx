/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "../ui/form";
import { DefaultGroupKey, groupIndexAtom } from "@/atoms/group";
import {
  groupsAtom,
  groupsAtomReducer,
  GroupActionType,
} from "@/atoms/group/groups";
import {
  FavoritesServerActionType,
  serverFavoritesAtom,
  serverFavoritesAtomReducer,
} from "@/atoms/server/favorites";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from "jotai";
import { useReducerAtom } from "jotai/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  hostname: z.string().min(1, {
    message: "Hostname is required",
  }),
});

export default function AddServer({ children }: { children: React.ReactNode }) {
  const groupIndex = useAtomValue(groupIndexAtom);

  const [, groupDispatch] = useReducerAtom(groupsAtom, groupsAtomReducer);
  const [, favoriteDispatch] = useReducerAtom(
    serverFavoritesAtom,
    serverFavoritesAtomReducer,
  );

  const isFavorite = groupIndex === DefaultGroupKey.Favorites;
  const isHosted = groupIndex === DefaultGroupKey.Hosted;
  const isGroup = !isFavorite && !isHosted;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      hostname: "",
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleSubmit = ({ hostname }: z.infer<typeof formSchema>) => {
    if (isGroup) {
      groupDispatch({
        hostname,
        groupId: groupIndex,
        type: GroupActionType.ADD_SERVER,
      });
    } else {
      favoriteDispatch({
        hostname,
        type: FavoritesServerActionType.ADD,
      });
    }

    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Add server</DialogTitle>
            </DialogHeader>
            <div className="space-y-2 py-4">
              <FormField
                control={form.control}
                name="hostname"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="hostname:port" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Add</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
