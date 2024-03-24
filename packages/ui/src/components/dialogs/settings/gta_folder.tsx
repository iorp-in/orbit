/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { GTAFolderAtom } from "@/atoms/gta-folder";
import { Button } from "@/components/ui/button";
import api from "@/lib/api";
import { Alert } from "@/lib/dialog";
import { selectFolder } from "@/lib/electron";
import { ExternalLinkIcon } from "@radix-ui/react-icons";
import { useAtom } from "jotai";
import React from "react";

export default function GTAFolderSetting() {
  const [folder, setFolder] = useAtom(GTAFolderAtom);

  const openFolder = async () => {
    const isOpen = await api?.invoke("open-link", folder);
    if (!isOpen) {
      void Alert({
        title: "Location Not Found",
        description:
          "We're sorry, but the location you entered could not be found. Please check the spelling and try again.",
        showCancel: false,
      });
    }
  };

  const handleFolderSelection = async () => {
    try {
      const selectedFolders = await selectFolder();

      const selectedFolder = selectedFolders?.[0];
      if (!selectedFolder) {
        return;
      }

      const gta_sa = `${selectedFolder}\\gta_sa.exe`;
      const samp = `${selectedFolder}\\samp.exe`;

      const isGtaSaExist = await api?.invoke("path-exist", gta_sa);
      const isSampExist = await api?.invoke("path-exist", samp);

      if (!isGtaSaExist) {
        throw new Error("GTA_SA.EXE not found in the selected folder.");
      }

      if (!isSampExist) {
        throw new Error("SAMP.EXE not found in the selected folder.");
      }

      setFolder(selectedFolder);
    } catch (error) {
      console.error("Error occurred during folder selection:", error);
      let errorMessage = "An unknown error occurred.";
      if (error instanceof Error && error.message) {
        errorMessage = error.message;
      }

      void Alert({
        title: "Error",
        description: errorMessage,
        showCancel: false,
      });
    }
  };

  return (
    <div className="space-y-2 py-4">
      <Label>Sa-MP Installation Location</Label>
      <div className="flex items-center gap-2">
        <Input placeholder={folder} readOnly />
        <button
          onClick={() => {
            void openFolder();
          }}
        >
          <ExternalLinkIcon className="h-5 w-5" />
        </button>
      </div>
      <Button
        size="sm"
        onClick={() => {
          void handleFolderSelection();
        }}
      >
        Change
      </Button>
    </div>
  );
}
