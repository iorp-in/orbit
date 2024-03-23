/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { ServerInfo } from "@/types/server-info";
import { atom } from "jotai";
import { atomFamily } from "jotai/utils";

export const serverInfoAtom = atomFamily(
  ({}: { address: string }) => atom<ServerInfo | null>(null),
  (a, b) => a.address === b.address,
);
