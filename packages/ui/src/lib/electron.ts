/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import api from "./api";
import { OpenDialogSyncOptions } from "electron";

export async function openDialog(
  options: OpenDialogSyncOptions,
): Promise<string[]> {
  return api?.invoke("select-dialog", options);
}

/**
 * Select folder
 */
export async function selectFolder(): Promise<string[] | undefined> {
  return openDialog({
    properties: ["openDirectory"],
    filters: [{ name: "All Files", extensions: ["*"] }],
  });
}
/**
 * Select single file
 */
export async function selectFile(
  extensions?: string[],
): Promise<string[] | undefined> {
  return openDialog({
    properties: ["openFile"],
    filters: [{ name: "All Files", extensions: extensions ?? ["*"] }],
  });
}

/**
 * Select multiple files
 */
export async function selectFiles(
  extensions?: string[],
): Promise<string[] | undefined> {
  return openDialog({
    properties: ["openFile", "multiSelections"],
    filters: [{ name: "All Files", extensions: extensions ?? ["*"] }],
  });
}

/**
 * Launch samp
 */
export async function launchSamp(options: {
  address: string;
  gta_sa: string;
  samp: string;
  username: string;
  rconPassword?: string;
  password?: string;
}): Promise<boolean> {
  return api?.invoke("launch-samp", options);
}
