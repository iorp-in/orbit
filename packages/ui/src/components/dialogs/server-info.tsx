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
  DialogTitle,
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { connectServer } from "@/lib/samp";
import { ServerInfo } from "@/types/server-info";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  password: z.string(),
  rconPassword: z.string(),
});

export default function ServerInfoDialog({
  onOpenChange,
  open,
  server,
}: {
  onOpenChange: (state: boolean) => void;
  open: boolean;
  server: ServerInfo;
}) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
      rconPassword: "",
    },
  });

  const handleSubmit = ({
    password,
    rconPassword,
  }: z.infer<typeof formSchema>) => {
    onOpenChange(false);
    toast.success(`Connecting to ${server.hostname ?? server.address}`);
    void connectServer(server, { password, rconPassword });
  };

  const players =
    server.online !== undefined && server.maxplayers !== undefined
      ? `${String(server.online)}/${String(server.maxplayers)}`
      : "-";

  const hostname = server.hostname ?? "-";
  const address = server.address;
  const ping = server.ping ?? "-";
  const mode = server.gamemode ?? "-";
  const mapname = server.mapname ?? "-";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl">
        <Form {...form}>
          {/* eslint-disable-next-line @typescript-eslint/no-misused-promises */}
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>Server properties</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-6">
              <div className="grid grid-cols-4 gap-2 px-3 text-sm">
                <div className="text-muted-foreground">HostName</div>
                <div className="col-span-3">{hostname}</div>
                <div className="text-muted-foreground">Address</div>
                <div className="col-span-3">{address}</div>
                <div className="text-muted-foreground">Players</div>
                <div className="col-span-3">{players}</div>
                <div className="text-muted-foreground">Ping</div>
                <div className="col-span-3">{ping}</div>
                <div className="text-muted-foreground">Mode</div>
                <div className="col-span-3">{mode}</div>
                <div className="text-muted-foreground">Language</div>
                <div className="col-span-3">{mapname}</div>
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Server password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <div className="space-y-2">
                <FormField
                  control={form.control}
                  name="rconPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder="Rcon password" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit">Connect</Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
