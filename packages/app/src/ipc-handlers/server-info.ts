/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { mainWindow } from "../index.js";
import { sampInfo } from "../utils/samp/index.js";
import { ipcMain } from "electron";
import Store from "electron-store";

const queue = new Set<string>();
const processed = new Store();
let isProcessing = false;

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
    const hostname = Array.from(queue)[0];
    const [host, port] = hostname.split(":");

    /**
     * Throw error if host is not found
     */
    if (!host) {
      throw Error(`Invalid host "${host}"`);
    }

    /**
     * Store null to skip future processing
     */

    processed.set(hostname, null);

    /**
     * Delete entry from queue
     */
    queue.delete(hostname);

    /**
     * Fetch server info
     */
    const portNumber = Number(port);
    const serverInfo = await sampInfo({
      host: host,
      port: Number.isFinite(portNumber) ? portNumber : 7777,
    });

    /**
     * Store locally
     */

    processed.set(hostname, serverInfo);

    /**
     * Send information to render
     */
    mainWindow?.webContents.send("server-info", hostname, serverInfo);
  } catch (err) {
    const error = err as Error;
    process.stdout.write(error.message);
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
ipcMain.handle("server-info", (event, hostname: string, force?: boolean) => {
  if (typeof hostname !== "string" || hostname.length === 0) {
    return null;
  }

  if (!processed.has(hostname) || force) {
    queue.add(hostname);
    void processQueue();
  }

  return processed.get(hostname) ?? null;
});
