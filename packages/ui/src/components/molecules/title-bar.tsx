"use client";

/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { appVersionAtom } from "@/atoms/app-version";
import { useAtomValue } from "jotai";
import { loadable } from "jotai/utils";
import React from "react";

const TitleBar = () => {
  const version = useAtomValue(loadable(appVersionAtom));

  const renderVersion = () => {
    if (version.state !== "hasData") {
      return "";
    }

    return `v${version.data}`;
  };

  return (
    <div id="title-bar" className="absolute top-0 z-10 h-8 w-full px-2">
      <div className="flex h-full items-center gap-2">
        <img alt="logo" src="/icon.png" className="h-5 w-5" />
        <span className="text-xs font-semibold">Orbit Launcher</span>
        <div className="text-muted-foreground text-xs">{renderVersion()}</div>
      </div>
    </div>
  );
};

export default TitleBar;
