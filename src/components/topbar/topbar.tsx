/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react";
import { ipcRenderer } from "electron";
import "../../App.global.css";
import { Grid } from "@material-ui/core";
import icon_topbar from "../../../assets/svg/topbar/icon_topbar.svg";

const MainWindow = ({ counter }: { counter: number }) => {
  const [max, setMax] = React.useState(false);
  function HandleMax() {
    if (!max) ipcRenderer.send("app:max");
    else ipcRenderer.send("app:unmax");
    setMax(!max);
  }

  function HandleMin() {
    ipcRenderer.send("app:min");
  }

  function HandleClose() {
    ipcRenderer.send("app:quit");
  }

  return (
    <div className="titlebar" style={{ backgroundColor: "#1D1D1F" }}>
      <Grid container direction="row" justify="space-between" alignItems="center">
        <Grid item>
          <img width={80} height={16} src={icon_topbar} alt="logo" />
        </Grid>
        <Grid item>
          <div style={{ display: "flex" }}>
            <span hidden={counter < 1} style={{ fontSize: "10px", color: "antiquewhite" }}>
              Fetching {counter} servers
            </span>
          </div>
        </Grid>
        <Grid item>
          <div className="titlebarNoDrag">
            <svg onClick={HandleMin} width="12" height="12" viewBox="0 0 11 1" className="topBarBtn" fill="none" style={{ padding: "6px 15px" }} xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4 0V1.00098H0.400024V0H10.4Z" />
            </svg>
            <svg onClick={HandleMax} width="12" height="12" viewBox="0 0 11 10" className="topBarBtn" fill="none" style={{ padding: "6px 15px" }} xmlns="http://www.w3.org/2000/svg">
              <path d="M10.4 0V10H0.400024V0H10.4ZM9.39905 1.00098H1.401V8.99902H9.39905V1.00098Z" />
            </svg>
            <svg onClick={HandleClose} width="12" height="12" viewBox="0 0 11 10" className="closeBtn" fill="none" style={{ padding: "6px 15px" }} xmlns="http://www.w3.org/2000/svg">
              <path d="M6.10803 5L10.4 9.29199L9.69202 10L5.40002 5.70801L1.10803 10L0.400024 9.29199L4.69202 5L0.400024 0.708008L1.10803 0L5.40002 4.29199L9.69202 0L10.4 0.708008L6.10803 5Z" />
            </svg>
          </div>
        </Grid>
      </Grid>
    </div>
  );
};

export default MainWindow;
