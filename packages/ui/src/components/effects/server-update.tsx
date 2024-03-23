"use client";

/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { serverHostAtom } from "@/atoms/server/host";
import { hostInfoAtom } from "@/atoms/server/host-info";
import { serversAtom } from "@/atoms/server/servers";
import api from "@/lib/api";
import { ServerInfo } from "@/types/server-info";
import equal from "fast-deep-equal";
import { useAtomValue, useStore } from "jotai";
import React, { useCallback } from "react";

export default function ServerUpdate() {
  const store = useStore();
  const servers = useAtomValue(serversAtom);
  const host = useAtomValue(serverHostAtom);

  const Refresh = useCallback(async () => {
    for await (const hostname of servers) {
      const resp = await api?.invoke("server-info", hostname);
      if (resp) {
        const prev = store.get(hostInfoAtom({ hostname }));
        if (!equal(prev, resp)) {
          store.set(hostInfoAtom({ hostname }), resp);
        }
      }
    }
  }, [servers, store]);

  React.useEffect(() => {
    api?.send("server-info-reset-queue");

    void Refresh();
  }, [store, servers, Refresh]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      if (host) {
        void api?.invoke("server-info", host.address, true);
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [host]);

  React.useEffect(() => {
    const removeEventListener = api?.receive(
      "server-info",
      (hostname: string, payload: ServerInfo) => {
        store.set(hostInfoAtom({ hostname }), payload);
      },
    );

    return () => {
      removeEventListener?.();
    };
  });

  return null;
}
