import React from "react";
import Dialog from "@material-ui/core/Dialog";
import sendAsync from "../../Services/asyncIPC";
import { Transition } from "../main/interfaces";

const DeleteServerDialog = ({
  open,
  setOpen,
  showNotification,
  selected,
  setSelectedID,
  selectedGroup,
  serversList,
  LoadServer,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showNotification: (type: "error" | "success" | "warning" | "info", text: string) => unknown;
  selected: string;
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
  selectedGroup: string;
  serversList: string;
  LoadServer: (group: string) => number;
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = async () => {
    if (serversList.length < 0) {
      setOpen(false);
      LoadServer(selectedGroup);
      showNotification("warning", "unable to delete server.");
      return 1;
    }
    let newServersList = "";
    let servers = serversList.split(",");
    if (!servers.includes(selected)) {
      showNotification("warning", "server does not exist.");
      setOpen(false);
      LoadServer(selectedGroup);
      return 1;
    }
    servers = servers.filter((res) => res !== selected);
    newServersList = servers.join(",");
    await sendAsync(`update servers set list = "${newServersList}" where groupid = "${selectedGroup}"`);
    showNotification("success", `server ${selected} has been removed!`);
    setOpen(false);
    LoadServer(selectedGroup);
    setSelectedID("");
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
          Delete server
        </span>
        <p
          style={{
            color: "#F5F5F5",
            paddingTop: "20px",
            fontSize: "12px",
          }}>
          Do you really want to delete {selected}?
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

export default DeleteServerDialog;
