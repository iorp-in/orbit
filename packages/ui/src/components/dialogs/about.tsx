/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { Button } from "@/components/ui/button";
import {
  DialogHeader,
  DialogFooter,
  DialogTitle,
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogClose,
} from "@/components/ui/dialog";
import api from "@/lib/api";
import { Link2Icon } from "@radix-ui/react-icons";
import React from "react";

export default function AboutPopup({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>About</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 py-4">
          <div className="grid grid-cols-4 gap-4">
            <div className="text-muted-foreground">Project</div>
            <div className="col-span-3">
              <button
                className="text-primary flex items-center gap-2 hover:underline"
                onClick={() => {
                  void api?.send(
                    "open-link",
                    "https://github.com/samarmeena/orbit",
                  );
                }}
              >
                <h1>Orbit Launcher</h1>
                <Link2Icon />
              </button>
            </div>
            <div className="text-muted-foreground">Developer</div>
            <div className="col-span-3">
              <button
                className="text-primary flex items-center gap-2 hover:underline"
                onClick={() => {
                  void api?.send("open-link", "https://github.com/samarmeena");
                }}
              >
                <h1>Vijay Meena</h1>
                <Link2Icon />
              </button>
            </div>
            <div className="text-muted-foreground">Support</div>
            <div className="col-span-3">
              <button
                className="text-primary flex items-center gap-2 hover:underline"
                onClick={() => {
                  void api?.send(
                    "open-link",
                    "mailto:indianoceanroleplay@gmail.com",
                  );
                }}
              >
                <h1>indianoceanroleplay@gmail.com</h1>
                <Link2Icon />
              </button>
            </div>
          </div>
        </div>
        <DialogFooter>
          <DialogClose asChild>
            <Button>Thanks</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
