/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { app, ipcMain } from "electron";

/**
 * Handle get-version
 */
ipcMain.handle("get-version", () => {
  return app.getVersion();
});
