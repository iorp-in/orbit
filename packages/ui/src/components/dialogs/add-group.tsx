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
import {
  groupsAtom,
  groupsAtomReducer,
  GroupActionType,
} from "@/atoms/group/groups";
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useReducerAtom } from "jotai/utils";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Group name is required",
  }),
});

export default function AddGroup({ children }: { children: React.ReactNode }) {
  const [, dispatch] = useReducerAtom(groupsAtom, groupsAtomReducer);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const [open, setOpen] = React.useState(false);

  const handleSubmit = ({ name }: z.infer<typeof formSchema>) => {
    dispatch({
      name,
      type: GroupActionType.ADD,
    });
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:sm:max-w-md">
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Add group</DialogTitle>
              <DialogDescription>
                Save your favorites server in single space.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-2 py-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Group name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button type="submit">Create</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
