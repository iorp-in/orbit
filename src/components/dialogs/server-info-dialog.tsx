import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Table, TableRow, TableCell, TableBody, TableContainer, makeStyles } from "@material-ui/core";
import { IServerData, Transition } from "../main/interfaces";

const useStyles = makeStyles({
  container: {
    maxHeight: "400px",
    "& table": {
      "& tr": {
        "& th": {
          padding: "5px",
          border: 0,
          color: "#ABABAB",
          backgroundColor: "#2a292c",
        },
        "& td": {
          padding: "5px",
          border: 0,
          color: "white",
          backgroundColor: "#2a292c",
        },
      },
    },
  },
});

const ServerInfoDialog = ({
  open,
  setOpen,
  serverdata,
  showNotification,
  handleConnect,
}: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  serverdata: IServerData;
  showNotification: (type: "error" | "success" | "warning" | "info", text: string) => unknown;
  handleConnect: (password?: undefined | string, rconpassword?: undefined | string) => Promise<number>;
}) => {
  const [password, setPassword] = React.useState("");
  const [rconPassword, setRconPassword] = React.useState("");

  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (serverdata.lock) {
      if (password.length < 1) return showNotification("error", "password required to connect this server!");
    }
    handleConnect(password, rconPassword);
    setOpen(false);
    return 1;
  };

  return (
    <div>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        <span style={{ fontSize: "14px", fontWeight: 700, lineHeight: "12px", letterSpacing: "0.1em" }}>{serverdata.hostname}</span>
        <div style={{ paddingTop: "14px" }}>
          <div>
            <TableContainer className={classes.container}>
              <Table aria-label="simple table">
                <TableBody>
                  <TableRow>
                    <TableCell align="left" style={{ color: "#ABABAB" }}>
                      IP Address
                    </TableCell>
                    <TableCell align="left">{serverdata.address}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{ color: "#ABABAB" }}>
                      Players
                    </TableCell>
                    <TableCell align="left">{serverdata.players}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{ color: "#ABABAB" }}>
                      Ping
                    </TableCell>
                    <TableCell align="left">{serverdata.ping} ms</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{ color: "#ABABAB" }}>
                      Gamemode
                    </TableCell>
                    <TableCell align="left">{serverdata.gamemode}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{ color: "#ABABAB" }}>
                      Language
                    </TableCell>
                    <TableCell align="left">{serverdata.language}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{ color: "#ABABAB" }}>
                      Map
                    </TableCell>
                    <TableCell align="left">{serverdata.map}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell align="left" style={{ color: "#ABABAB" }}>
                      Web
                    </TableCell>
                    <TableCell align="left">{serverdata.web}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div style={{ paddingTop: "14px" }}>
            <input
              placeholder="Server password..."
              type="text"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div style={{ paddingTop: "14px" }}>
            <input
              placeholder="Rcon password..."
              type="text"
              value={rconPassword}
              onChange={(e) => {
                setRconPassword(e.target.value);
              }}
            />
          </div>
        </div>
        <div style={{ display: "flex", paddingTop: "14px" }}>
          <button
            type="button"
            style={{ margin: "auto" }}
            className="red lbtn"
            onClick={() => {
              handleClose();
            }}>
            <span className="btnText">Close</span>
          </button>
          <button
            type="button"
            style={{ margin: "auto" }}
            className="lbtn"
            onClick={() => {
              handleConfirm();
            }}>
            <span className="btnText">Connect</span>
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default ServerInfoDialog;
