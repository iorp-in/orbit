import React from "react";
import Dialog from "@material-ui/core/Dialog";
import sendAsync from "../../Services/asyncIPC";
import { Transition } from "../main/interfaces";

const DeleteGroupDialog = ({
  open,
  setOpen,
  showNotification,
  setSelectedID,
  setSelectedGroup,
  selectedGroup,
  LoadGroups,
  LoadServer,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showNotification: (type: "error" | "success" | "warning" | "info", text: string, duration?: number) => unknown;
  selectedGroup: string;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
  setSelectedGroup: React.Dispatch<React.SetStateAction<string>>;
  LoadGroups: () => Promise<number>;
  LoadServer: (group: string) => number;
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (selectedGroup.length < 0) {
      setOpen(false);
      await LoadGroups();
      return 1;
    }
    setOpen(false);
    await sendAsync(`DELETE FROM servers where groupid = "${selectedGroup}"`);
    setSelectedID("");
    setSelectedGroup("Favorites");
    await LoadServer("Favorites");
    await LoadGroups();
    showNotification("success", `deleted ${selectedGroup} server group`, 3000);
    return 1;
  };

  return (
    <div>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        <span
          style={{
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "12px",
            letterSpacing: "0.1em",
          }}>
          Delete group
        </span>
        <p
          style={{
            color: "#F5F5F5",
            paddingTop: "20px",
            fontSize: "12px",
          }}>
          Do you really want to delete {selectedGroup}?
        </p>
        <div style={{ display: "flex", paddingTop: "14px" }}>
          <button
            style={{ margin: "auto" }}
            type="button"
            className="red lbtn"
            onClick={() => {
              handleClose();
            }}>
            <span className="btnText">No</span>
          </button>
          <button style={{ margin: "auto" }} type="button" className="lbtn" onClick={handleConfirm}>
            <span className="btnText">Yes</span>
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default DeleteGroupDialog;
