/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { atomWithStorage } from "jotai/utils";

export const DefaultGtaFolder = "C:\\Program Files (x86)\\GTA San Andreas";

export const GTAFolderAtom = atomWithStorage("gta-folder", DefaultGtaFolder);
