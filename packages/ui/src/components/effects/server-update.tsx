"use client";

/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { serverInfoAtom } from "@/atoms/server/info";
import { serverAtom } from "@/atoms/server/server";
import { serversAtom } from "@/atoms/server/servers";
import api from "@/lib/api";
import { ServerInfo } from "@/types/server-info";
import equal from "fast-deep-equal";
import { useAtomValue, useStore } from "jotai";
import React, { useCallback } from "react";

export default function ServerUpdate() {
  const store = useStore();
  const servers = useAtomValue(serversAtom);
  const server = useAtomValue(serverAtom);

  const Refresh = useCallback(async () => {
    for await (const address of servers) {
      const resp = await api?.invoke("server-info", address);
      if (resp) {
        const prev = store.get(serverInfoAtom({ address }));
        if (!equal(prev, resp)) {
          store.set(serverInfoAtom({ address }), resp);
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
      if (server) {
        void api?.invoke("server-info", server.address, true);
      }
    }, 2000);

    return () => {
      clearInterval(intervalId);
    };
  }, [server]);

  React.useEffect(() => {
    const removeEventListener = api?.receive(
      "server-info",
      (address: string, payload: ServerInfo) => {
        store.set(serverInfoAtom({ address }), payload);
      },
    );

    return () => {
      removeEventListener?.();
    };
  });

  return null;
}
