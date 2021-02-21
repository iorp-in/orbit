import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Table, TableHead, TableRow, TableCell, TableBody, TableContainer, makeStyles } from "@material-ui/core";
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

const PlayersDialog = ({ open, setOpen, serverdata }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; serverdata: IServerData }) => {
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        <span style={{ fontSize: "14px", fontWeight: 700, lineHeight: "12px", letterSpacing: "0.1em" }}>{serverdata.hostname} players</span>
        <div style={{ paddingTop: "14px" }}>
          <div hidden={serverdata.players.length > 0}>No players in server</div>
          <div hidden={serverdata.players.length < 1}>
            <TableContainer className={classes.container}>
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="right">Score</TableCell>
                    <TableCell align="right">Ping</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {serverdata.playersList.map((row, index) => (
                    <TableRow key={`${row.name}-${Number(index)}-players`}>
                      <TableCell component="th" scope="row">
                        {row.name}
                      </TableCell>
                      <TableCell align="right">{row.score}</TableCell>
                      <TableCell align="right">{row.ping}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
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
        </div>
      </Dialog>
    </div>
  );
};

export default PlayersDialog;
