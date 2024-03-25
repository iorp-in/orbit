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
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogDescription,
  DialogTitle,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { createRoot } from "react-dom/client";
import { useForm } from "react-hook-form";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(1, {
    message: "Group name is required",
  }),
});

const RenderDialog = ({
  groupName,
  onClose,
}: {
  groupId: number;
  groupName: string;
  onClose: (name: string | null) => void;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: groupName,
    },
  });

  const handleSubmit = ({ name }: z.infer<typeof formSchema>) => {
    onClose(name);
  };

  return (
    <Dialog
      open={true}
      onOpenChange={() => {
        onClose(null);
      }}
    >
      <DialogContent className="sm:sm:max-w-md">
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Rename group</DialogTitle>
              <DialogDescription>{groupName}</DialogDescription>
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
              <Button type="submit">Update</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default function RenameGroup(groupId: number, groupName: string) {
  return new Promise<string | null>((resolve) => {
    const container = document.createElement("div");
    const root = createRoot(container);

    const handleClose = (name: string | null) => {
      root.unmount();
      resolve(name);
    };

    root.render(
      <RenderDialog
        groupId={groupId}
        groupName={groupName}
        onClose={handleClose}
      />,
    );
  });
}
