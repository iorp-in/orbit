import React from "react";
import path from "path";
import Dialog from "@material-ui/core/Dialog";
import sendAsync from "../../Services/asyncIPC";
import { Transition } from "../main/interfaces";

const SettingsDialog = ({
  open,
  setOpen,
  showNotification,
  gtaSa,
  setGtaSA,
}: {
  open: boolean;
  gtaSa: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setGtaSA: React.Dispatch<React.SetStateAction<string>>;
  showNotification: (type: "error" | "success" | "warning" | "info", text: string) => unknown;
}) => {
  let upload: HTMLInputElement | null;
  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    sendAsync(`update settings set value = "${gtaSa}" where id = "sa_exe"`);
    showNotification("success", "settings updated");
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} TransitionComponent={Transition} keepMounted aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        <span
          style={{
            fontSize: "14px",
            fontWeight: 700,
            lineHeight: "12px",
            letterSpacing: "0.1em",
          }}>
          Settings
        </span>
        <p
          style={{
            color: "#ABABAB",
            paddingTop: "20px",
            fontSize: "12px",
            textAlign: "left",
          }}>
          San Andreas Direction
        </p>
        <div style={{ display: "flex", paddingTop: "14px" }}>
          <input
            placeholder="san andreas directory"
            type="text"
            value={gtaSa}
            disabled
            onChange={(e) => {
              setGtaSA(e.target.value);
            }}
          />
          <input
            placeholder="san andreas directory"
            type="file"
            ref={(ref) => {
              upload = ref;
            }}
            hidden
            accept=".exe"
            onChange={(e) => {
              if (e.target.files !== null && e.target.files.length > 0) {
                const filePath = e.target.files[0].path;
                const fileName = path.basename(filePath);
                setGtaSA("");
                if (fileName !== "gta_sa.exe") {
                  showNotification("error", "select gta_sa.exe from gta san andreas directory");
                  return 1;
                }
                setGtaSA(filePath.toString());
              }
              return 1;
            }}
          />
          <button
            type="button"
            className="btn"
            onClick={async () => {
              if (upload !== null) {
                upload.click();
              }
            }}>
            <svg width="14" height="14" style={{ padding: "3px" }} viewBox="0 0 14 11" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2H8C8 3.10457 7.10457 4 6 4H0V9C0 10.1046 0.89543 11 2 11H12C13.1046 11 14 10.1046 14 9V4C14 2.89543 13.1046 2 12 2Z" />
              <path d="M0 1.5C0 0.671573 0.671573 0 1.5 0H5.5C6.32843 0 7 0.671573 7 1.5C7 2.32843 6.32843 3 5.5 3H1C0.447715 3 0 2.55228 0 2V1.5Z" />
            </svg>
          </button>
        </div>
        <div style={{ display: "flex", paddingTop: "20px" }}>
          <p
            style={{
              color: "#ABABAB",
              fontSize: "12px",
              textAlign: "center",
            }}>
            Copyright © 2021 Orbit Launcher V1.0 Stable
          </p>
        </div>
        <div style={{ display: "flex", paddingTop: "14px" }}>
          <button
            type="button"
            className="red lbtn"
            style={{ margin: "auto" }}
            onClick={() => {
              handleClose();
            }}>
            <span className="btnText">Cancel</span>
          </button>
          <button style={{ margin: "auto" }} type="button" className="lbtn" onClick={handleConfirm}>
            <span className="btnText">Apply</span>
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default SettingsDialog;
