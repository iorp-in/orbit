/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { ElectronApi } from "@/app";

function getApi(): ElectronApi | undefined {
  if (typeof window === "undefined") {
    return undefined;
  }

  return window.api;
}

export default getApi();
