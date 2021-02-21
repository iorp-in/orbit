import React from "react";
import Dialog from "@material-ui/core/Dialog";
import sendAsync from "../../Services/asyncIPC";
import { IServers, Transition } from "../main/interfaces";

const RenameGroupDialog = ({
  open,
  setOpen,
  showNotification,
  selectedGroup,
  LoadGroups,
}: {
  open: boolean;
  selectedGroup: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showNotification: (type: "error" | "success" | "warning" | "info", text: string) => unknown;
  LoadGroups: () => unknown;
}) => {
  const [name, setName] = React.useState(selectedGroup);
  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const handleCreate = async () => {
    if (selectedGroup === name) {
      setName("");
      setOpen(false);
      return 1;
    }
    if (name.length < 1) {
      showNotification("error", "group name is too short?");
      return 1;
    }
    if (name.length > 12) {
      showNotification("error", "group name is too long?");
      return 1;
    }
    const resp2 = (await sendAsync(`SELECT * FROM servers where groupid = "${name}"`)) as IServers[];
    if (resp2.length > 0) {
      showNotification("warning", "group name is already exist.");
      return 1;
    }
    await sendAsync(`update servers set groupid = "${name}" where groupid = "${selectedGroup}"`);
    showNotification("success", `group ${selectedGroup} has been renamed to ${name}!`);
    setName("");
    setOpen(false);
    await LoadGroups();
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
          Rename group {selectedGroup}
        </span>
        <p
          style={{
            color: "#F5F5F5",
            paddingTop: "20px",
            fontSize: "12px",
          }}>
          what will you name it?
        </p>
        <div style={{ paddingTop: "14px" }}>
          <input
            placeholder="Group name..."
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", paddingTop: "14px", minWidth: "222px" }}>
          <button
            type="button"
            className="red lbtn"
            style={{ margin: "auto" }}
            onClick={() => {
              handleClose();
            }}>
            <span className="btnText">Cancel</span>
          </button>
          <button style={{ margin: "auto" }} type="button" className="lbtn" onClick={handleCreate}>
            <span className="btnText">Rename</span>
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default RenameGroupDialog;
