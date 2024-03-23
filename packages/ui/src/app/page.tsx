"use client";

/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import ServerInfo from "@/components/molecules/server-info";
import ServerList from "@/components/molecules/server-list";
import { Sidebar } from "@/components/molecules/sidebar";
import TopNav from "@/components/molecules/top-nav";
import React from "react";

export default function Page() {
  return (
    <div className="min-h-screen">
      <div className="border-b p-2 pt-10">
        <TopNav />
      </div>
      <div className="flex">
        <div className="w-full max-w-[160px]">
          <Sidebar />
        </div>
        <div className="flex-1 overflow-hidden border-l border-r">
          <ServerList />
        </div>
        <div className="w-full max-w-[200px]">
          <ServerInfo />
        </div>
      </div>
    </div>
  );
}
