/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import "./ipc-handlers/index.js";
import electron from "electron";
import serve from "electron-serve";
import ElectronStore from "electron-store";
import path from "path";
import { updateElectronApp } from "update-electron-app";

const store = new ElectronStore();
const { app, BrowserWindow } = electron;

/**
 * Handle squirrel events
 */
if (require("electron-squirrel-startup")) app.quit();

/**
 * Auto update
 */
if (app.isPackaged) {
  updateElectronApp();
}

/**
 * Render UI
 */
const appServe = serve({
  scheme: "app",
  directory: path.join(__dirname, "../web"),
});

/**
 * Main window
 */
let mainWindow: electron.BrowserWindow | null = null;

function createWindow() {
  const bounds = store.get("win-bounds") as Electron.Rectangle;

  mainWindow = new BrowserWindow({
    ...bounds,
    show: false,
    minWidth: 800,
    minHeight: 600,
    frame: true,
    titleBarStyle: "hidden",
    titleBarOverlay: {
      symbolColor: "#777",
      color: "rgba(0,0,0,0)",
    },
    webPreferences: {
      preload: `${__dirname}/preload/index.js`,
      nodeIntegration: true,
      devTools: app.isPackaged ? false : true,
    },
  });

  if (app.isPackaged) {
    void appServe(mainWindow).then(() => {
      void mainWindow?.loadURL("app://-/");
    });
  } else {
    void mainWindow.loadURL("http://localhost:3000");
  }

  /**
   * Show window when ready
   */
  mainWindow.once("ready-to-show", () => {
    mainWindow?.show();
  });

  /**
   * Focus on show
   */

  mainWindow.on("show", () => {
    app.focus();
  });

  /**
   * Save bounds
   */
  mainWindow.on("close", () => {
    const bounds = mainWindow?.getBounds();
    if (bounds) {
      store.set("win-bounds", bounds);
    }
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });
}

void app.whenReady().then(() => {
  createWindow();

  app.on("activate", function () {
    if (mainWindow === null) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

export { app, mainWindow };
