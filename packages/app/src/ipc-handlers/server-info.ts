/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { mainWindow } from "../index.js";
import { sampInfo } from "../utils/samp/index.js";
import { ServerInfo } from "../utils/samp/types.js";
import { ipcMain } from "electron";
import ElectronStore from "electron-store";

const queue = new Set<string>();
const processed = new ElectronStore<Record<string, ServerInfo | null>>({
  name: "servers-info",
});
let isProcessing = false;

const hex = (text: string) => Buffer.from(text, "utf8").toString("hex");

async function processQueue() {
  /**
   * Skip if already in process
   */
  if (isProcessing) {
    return;
  }

  try {
    /**
     * Set processing state
     */
    isProcessing = true;

    /**
     * Stop if queue is empty
     */
    if (queue.size === 0) {
      return;
    }

    /**
     * Get host ip and port
     */
    const address = Array.from(queue)[0];
    const [host, port] = address.split(":");

    /**
     * Throw error if host is not found
     */
    if (!host || !port || !Number.isFinite(Number(port))) {
      throw Error(`Invalid server "${address}"`);
    }

    /**
     * Store null to skip future processing
     */

    processed.set(hex(address), null);

    /**
     * Delete entry from queue
     */
    queue.delete(address);

    /**
     * Fetch server info
     */
    const serverInfo = await sampInfo({
      host: host,
      port: Number(port),
    });

    /**
     * Store locally
     */

    processed.set(hex(address), serverInfo);

    /**
     * Send information to render
     */
    mainWindow?.webContents.send("server-info", address, serverInfo);
  } catch (err) {
    const error = err as Error;
    console.log(error.message);
  } finally {
    /**
     * End processing
     */
    isProcessing = false;

    /**
     * Run again, if queue is not empty
     */
    if (queue.size !== 0) {
      void processQueue();
    }
  }
}

/**
 * Clear queue
 */
ipcMain.on("server-info-reset-queue", () => {
  queue.clear();
});

/**
 * Handle server info request
 */
ipcMain.handle("server-info", (event, address: string, force?: boolean) => {
  if (typeof address !== "string" || address.length === 0) {
    return null;
  }

  if (!processed.has(hex(address)) || force) {
    queue.add(address);
    void processQueue();
  }

  return processed.get(hex(address)) ?? null;
});
