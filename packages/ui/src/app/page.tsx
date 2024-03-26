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
import useIsClient from "@/lib/is-client";
import useWidthPercentage from "@/lib/width";
import React from "react";

function PageView() {
  const leftMinSize = useWidthPercentage(160, 0);
  const rightMinSize = useWidthPercentage(200, 0);

  const [windowResized, setWindowResized] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setWindowResized(true);
      setTimeout(() => {
        setWindowResized(false);
      }, 200);
    };

    // Listen for resize
    window.addEventListener("resize", handleResize);

    // Cleanup function to remove the event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="min-h-screen">
      <div className="border-b p-2 pt-10">
        <TopNav />
      </div>
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel
          defaultSize={leftMinSize}
          minSize={leftMinSize}
          maxSize={windowResized ? leftMinSize : undefined}
        >
          <Sidebar />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel minSize={50}>
          <ServerList />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel
          defaultSize={rightMinSize}
          minSize={rightMinSize}
          maxSize={windowResized ? leftMinSize : undefined}
        >
          <ServerInfo />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}

export default function Page() {
  const isClient = useIsClient();

  if (!isClient) {
    return <></>;
  }

  return <PageView />;
}
