/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { ipcMain } from "electron";
import fs from "fs";
import path from "path";

ipcMain.handle("path-exist", (event, uri: string) => {
  return fs.existsSync(path.normalize(uri));
});
