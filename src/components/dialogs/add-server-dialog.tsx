import React from "react";
import Dialog from "@material-ui/core/Dialog";
import sendAsync from "../../Services/asyncIPC";
import { Transition } from "../main/interfaces";
import { isValidServerAddress } from "../../Services/samp";

const AddServerDialog = ({
  open,
  setOpen,
  showNotification,
  selectedGroup,
  serversList,
  LoadServer,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showNotification: (type: "error" | "success" | "warning" | "info", text: string) => unknown;
  serversList: string;
  selectedGroup: string;
  LoadServer: (group: string) => number;
}) => {
  const [name, setName] = React.useState("");
  const handleClose = () => {
    setName("");
    setOpen(false);
  };

  const handleAdd = async () => {
    let newServersList = "";
    if (name.length < 1) {
      showNotification("error", "server ip is too short?");
      return 1;
    }
    if (name.length > 20) {
      showNotification("error", "server ip is too long?");
      return 1;
    }
    if (!isValidServerAddress(name)) {
      return showNotification("warning", "invalid server ip");
    }
    if (serversList.length > 0) {
      const servers = serversList.split(",");
      if (servers.includes(name)) {
        return showNotification("warning", "server is already exist in current group.");
      }
      servers.push(name);
      newServersList = servers.join(",");
    } else {
      newServersList = name;
    }

    await sendAsync(`update servers set list = "${newServersList}" where groupid = "${selectedGroup}"`);
    showNotification("success", `server ${name} has been added!`);
    setName("");
    setOpen(false);
    await LoadServer(selectedGroup);
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
          Add new server
        </span>
        <p
          style={{
            color: "#F5F5F5",
            paddingTop: "20px",
            fontSize: "12px",
          }}>
          type hostname and port.
        </p>
        <div style={{ paddingTop: "14px" }}>
          <input
            placeholder="Serverip:Port..."
            type="text"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
        </div>
        <div style={{ display: "flex", paddingTop: "14px" }}>
          <button
            type="button"
            style={{ margin: "auto" }}
            className="red lbtn"
            onClick={() => {
              handleClose();
            }}>
            <span className="btnText">Cancel</span>
          </button>
          <button style={{ margin: "auto" }} type="button" className="lbtn" onClick={handleAdd}>
            <span className="btnText">Add</span>
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default AddServerDialog;
