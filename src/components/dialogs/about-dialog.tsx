import React from "react";
import Dialog from "@material-ui/core/Dialog";
import { Table, TableRow, TableCell, TableBody, TableContainer, makeStyles } from "@material-ui/core";
import { Transition } from "../main/interfaces";

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

const AboutDialog = ({ open, setOpen }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const classes = useStyles();
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog open={open} TransitionComponent={Transition} keepMounted onClose={handleClose} aria-labelledby="alert-dialog-slide-title" aria-describedby="alert-dialog-slide-description">
        <span style={{ fontSize: "14px", fontWeight: 700, lineHeight: "12px", letterSpacing: "0.1em" }}>About Orbit Launcher</span>
        <div style={{ paddingTop: "14px" }}>
          <TableContainer className={classes.container}>
            <Table aria-label="simple table">
              <TableBody>
                <TableRow>
                  <TableCell align="left" style={{ color: "#ABABAB" }}>
                    Designer
                  </TableCell>
                  <TableCell align="left">Nick Saldayew</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" style={{ color: "#ABABAB" }}>
                    Developer
                  </TableCell>
                  <TableCell align="left">Harry James</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" style={{ color: "#ABABAB" }}>
                    Contact
                  </TableCell>
                  <TableCell align="left" style={{ userSelect: "all" }}>
                    indianoceanroleplay@gmail.com
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" style={{ color: "#ABABAB" }}>
                    Report Issues
                  </TableCell>
                  <TableCell align="left" style={{ userSelect: "all" }}>
                    https://github.com/oceanroleplay/orbit
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
        <div style={{ display: "flex", paddingTop: "14px" }}>
          <button
            type="button"
            style={{ margin: "auto" }}
            className="red lbtn"
            onClick={() => {
              handleClose();
            }}>
            <span className="btnText">Thank you</span>
          </button>
        </div>
      </Dialog>
    </div>
  );
};

export default AboutDialog;
