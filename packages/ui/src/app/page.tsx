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
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import React from "react";
import { PanelGroupOnLayout } from "react-resizable-panels";

export default function Page() {
  const onLayout: PanelGroupOnLayout = (layout) => {
    layout;
  };

  return (
    <div className="min-h-screen">
      <div className="border-b p-2 pt-10">
        <TopNav />
      </div>
      <ResizablePanelGroup direction="horizontal" onLayout={onLayout}>
        <ResizablePanel defaultSize={20}>
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel>
          <ServerList />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={20}>
          <ServerInfo />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
