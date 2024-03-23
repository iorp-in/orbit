/*
 * --------------------------------------------------------------------------------------------------------
 * Copyright (c) Vijay Meena <vijayymmeena@gmail.com> (https://github.com/samarmeena). All rights reserved.
 * Licensed under the Apache License. See License.txt in the project root for license information.
 * --------------------------------------------------------------------------------------------------------
 */
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import React from "react";
import { createRoot } from "react-dom/client";

type Props = {
  title: string;
  description: string;
  showCancel?: boolean;
  showConfirm?: boolean;
  closeButtonText?: string;
  confirmButtonText?: string;
  onCancel?: () => void;
  onConfirm?: () => void;
  onClose?: () => void;
};

export const Alert = ({
  title,
  description,
  showCancel = true,
  showConfirm = true,
  closeButtonText = "Cancel",
  confirmButtonText = "Continue",
  onCancel,
  onConfirm,
  onClose,
}: Props): Promise<void> => {
  return new Promise((resolve) => {
    const container = document.createElement("div");
    const root = createRoot(container);

    const handleClose = () => {
      root.unmount();
      resolve();
      onClose?.();
    };

    root.render(
      <AlertDialog open={true} onOpenChange={handleClose}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{title}</AlertDialogTitle>
            <AlertDialogDescription>{description}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            {showCancel && (
              <AlertDialogCancel onClick={onCancel}>
                {closeButtonText}
              </AlertDialogCancel>
            )}
            {showConfirm && (
              <AlertDialogAction onClick={onConfirm}>
                {confirmButtonText}
              </AlertDialogAction>
            )}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>,
    );
  });
};
