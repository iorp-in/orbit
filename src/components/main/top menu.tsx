/* eslint-disable no-console */
import React from "react";
import { Grid } from "@material-ui/core";
import sendAsync from "../../Services/asyncIPC";

const TopBarMenu = ({
  selected,
  selectedGroup,
  showNotification,
  LoadServer,
  username,
  setUsername,
  setAddServerDialog,
  setDeleteServerDialog,
  setSettingsDialog,
  handleConnect,
  filter,
  setFilter,
  setAboutDialog,
}: {
  selected: string;
  selectedGroup: string;
  username: string;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
  showNotification: (type: "error" | "success" | "warning" | "info", text: string, duration?: number | undefined) => void;
  LoadServer: (group: string) => number;
  filter: boolean;
  setFilter: React.Dispatch<React.SetStateAction<boolean>>;
  setAddServerDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setSettingsDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleteServerDialog: React.Dispatch<React.SetStateAction<boolean>>;
  setAboutDialog: React.Dispatch<React.SetStateAction<boolean>>;
  handleConnect: () => Promise<number>;
}) => {
  async function UpdateUsername(name: string) {
    sendAsync(`update settings set value = "${name}" where id = "username"`)
      .then((res) => {
        return res;
      })
      .catch((err) => console.log(err));
  }

  return (
    <Grid item xs={10}>
      <div style={{ padding: "4px", margin: "auto" }}>
        <Grid container justify="flex-start" alignItems="center">
          <Grid item>
            <button
              type="button"
              className="lbtn"
              disabled={selected.length < 1}
              onClick={() => {
                handleConnect();
              }}>
              <svg width="14" height="14" viewBox="0 0 12 14" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M1.52588e-05 12.4844C1.52588e-05 13.5818 1.20523 14.2526 2.13786 13.6742L10.9815 8.18977C11.8644 7.64225 11.8644 6.35772 10.9815 5.81021L2.13786 0.325785C1.20523 -0.252591 1.52588e-05 0.418151 1.52588e-05 1.51557V12.4844Z"
                />
              </svg>
              <span className="btnText">Connect</span>
            </button>
          </Grid>
          <Grid item>
            <button
              type="button"
              className="btn"
              disabled={selectedGroup === "Hosted"}
              onClick={() => {
                setAddServerDialog(true);
              }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.00002 0C6.44773 0 6.00002 0.447715 6.00002 1V6H1.00002C0.44773 6 1.52588e-05 6.44772 1.52588e-05 7C1.52588e-05 7.55228 0.44773 8 1.00002 8H6.00002V13C6.00002 13.5523 6.44773 14 7.00002 14C7.5523 14 8.00002 13.5523 8.00002 13V8H13C13.5523 8 14 7.55228 14 7C14 6.44771 13.5523 6 13 6H8.00002V1C8.00002 0.447715 7.5523 0 7.00002 0Z" />
              </svg>
            </button>
          </Grid>
          <Grid item>
            <button
              type="button"
              className="btn"
              disabled={selectedGroup === "Hosted" || selected.length < 1}
              onClick={() => {
                setDeleteServerDialog(true);
              }}>
              <svg width="14" height="14" viewBox="0 0 12 13" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.00002 1C4.00002 0.447715 4.44773 0 5.00002 0H7.00002C7.5523 0 8.00002 0.447715 8.00002 1H11C11.5523 1 12 1.44772 12 2C12 2.55228 11.5523 3 11 3H1.00002C0.44773 3 1.52588e-05 2.55228 1.52588e-05 2C1.52588e-05 1.44772 0.447731 1 1.00002 1H4.00002Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3.00002 4C1.89544 4 1.00002 4.89543 1.00002 6V11C1.00002 12.1046 1.89544 13 3.00002 13H9.00002C10.1046 13 11 12.1046 11 11V6C11 4.89543 10.1046 4 9.00002 4H3.00002ZM4.00002 6C3.44773 6 3.00002 6.44772 3.00002 7V10C3.00002 10.5523 3.44773 11 4.00002 11C4.5523 11 5.00002 10.5523 5.00002 10V7C5.00002 6.44772 4.5523 6 4.00002 6ZM7.00002 7C7.00002 6.44772 7.44773 6 8.00002 6C8.5523 6 9.00002 6.44772 9.00002 7V10C9.00002 10.5523 8.5523 11 8.00002 11C7.44773 11 7.00002 10.5523 7.00002 10V7Z"
                />
              </svg>
            </button>
          </Grid>
          <Grid item>
            <button
              type="button"
              className="btn"
              onClick={async () => {
                showNotification("success", "refreshing list...", 1000);
                await LoadServer(selectedGroup);
              }}>
              <svg width="14" height="14" viewBox="0 0 14 13" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.21977 0.311048C5.32409 -0.0541916 6.50934 -0.0988513 7.63802 0.182249C8.76669 0.46335 9.79254 1.05869 10.5966 1.89921C10.7978 2.10958 10.9831 2.33314 11.1514 2.568V0.999908C11.1514 0.447624 11.5991 -9.15527e-05 12.1514 -9.15527e-05C12.7037 -9.15527e-05 13.1514 0.447624 13.1514 0.999908V4.99991C13.1514 5.55219 12.7037 5.99991 12.1514 5.99991H11.5102H7.99991C7.44762 5.99991 6.99991 5.55219 6.99991 4.99991C6.99991 4.44762 7.44762 3.99991 7.99991 3.99991H9.74936C9.58364 3.71202 9.38318 3.52408 9.15132 3.2817C8.60871 2.71445 7.91639 2.31267 7.15467 2.12297C6.39296 1.93326 5.59307 1.9634 4.84779 2.20989C4.10251 2.45638 3.44239 2.90912 2.944 3.51559C2.44561 4.12206 2.12938 4.8574 2.03199 5.63632C1.9346 6.41524 2.06004 7.20581 2.39376 7.91632C2.72749 8.62683 3.25582 9.22816 3.91746 9.65057C4.57911 10.073 5.34695 10.2991 6.13193 10.3028C6.68421 10.3054 7.12982 10.7552 7.12723 11.3075C7.12464 11.8598 6.67483 12.3054 6.12256 12.3028C4.95941 12.2973 3.82165 11.9622 2.84126 11.3363C1.86086 10.7104 1.078 9.8194 0.583505 8.76659C0.0890065 7.71379 -0.0968695 6.54236 0.0474387 5.38819C0.191747 4.23402 0.660325 3.14442 1.39882 2.24578C2.13731 1.34714 3.11545 0.676287 4.21977 0.311048Z" />
              </svg>
            </button>
          </Grid>
          <Grid item>
            <button
              type="button"
              className="btn"
              onClick={async () => {
                setSettingsDialog(true);
              }}>
              <svg width="14" height="14" viewBox="0 0 16 16" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M6.01516 15.7518C6.13735 14.7643 6.97937 13.9999 7.99992 13.9999C9.02047 13.9999 9.86248 14.7643 9.98468 15.7518C10.7602 15.5538 11.4903 15.2426 12.1565 14.8367C11.7866 14.089 11.9129 13.158 12.5355 12.5355C13.158 11.9129 14.089 11.7866 14.8367 12.1565C15.2426 11.4903 15.5538 10.7602 15.7518 9.98468C14.7643 9.86248 13.9999 9.02047 13.9999 7.99992C13.9999 6.97937 14.7643 6.13735 15.7518 6.01516C15.5538 5.23967 15.2426 4.5095 14.8367 3.84332C14.089 4.21328 13.158 4.08697 12.5355 3.46438C11.9129 2.8418 11.7866 1.91086 12.1565 1.16316C11.4903 0.757268 10.7602 0.446007 9.98468 0.248047C9.86248 1.23553 9.02047 1.99992 7.99992 1.99992C6.97937 1.99992 6.13735 1.23553 6.01516 0.248047C5.23967 0.446006 4.5095 0.757269 3.84332 1.16316C4.21328 1.91086 4.08697 2.8418 3.46438 3.46439C2.8418 4.08697 1.91086 4.21329 1.16316 3.84332C0.757269 4.50951 0.446007 5.23968 0.248047 6.01516C1.23553 6.13735 1.99992 6.97937 1.99992 7.99992C1.99992 9.02047 1.23553 9.86248 0.248047 9.98468C0.446006 10.7602 0.757268 11.4903 1.16316 12.1565C1.91086 11.7866 2.8418 11.9129 3.46438 12.5355C4.08697 13.158 4.21328 14.089 3.84332 14.8367C4.5095 15.2426 5.23967 15.5538 6.01516 15.7518ZM10.9999 7.99992C10.9999 9.65677 9.65677 10.9999 7.99992 10.9999C6.34306 10.9999 4.99992 9.65677 4.99992 7.99992C4.99992 6.34306 6.34306 4.99992 7.99992 4.99992C9.65677 4.99992 10.9999 6.34306 10.9999 7.99992Z"
                />
              </svg>
            </button>
          </Grid>
          <span style={{ margin: "auto" }} />
          <Grid item>
            <input
              type="text"
              placeholder="Type your nickname"
              spellCheck="false"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                UpdateUsername(e.target.value);
              }}
            />
          </Grid>
          <Grid item>
            <button
              type="button"
              className="lbtn"
              onClick={() => {
                setFilter(!filter);
              }}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.8293 4C11.4175 5.16519 10.3062 6 9 6C7.69378 6 6.58254 5.16519 6.17071 4H1C0.447716 4 0 3.55228 0 3C0 2.44772 0.447715 2 1 2H6.17071C6.58254 0.834807 7.69378 0 9 0C10.3062 0 11.4175 0.834807 11.8293 2H13C13.5523 2 14 2.44772 14 3C14 3.55228 13.5523 4 13 4H11.8293ZM8 3C8 3.55228 8.44772 4 9 4C9.55228 4 10 3.55228 10 3C10 2.44772 9.55228 2 9 2C8.44772 2 8 2.44772 8 3Z"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M2.17071 12C2.58254 13.1652 3.69378 14 5 14C6.30622 14 7.41746 13.1652 7.82929 12H13C13.5523 12 14 11.5523 14 11C14 10.4477 13.5523 10 13 10H7.82929C7.41746 8.83481 6.30622 8 5 8C3.69378 8 2.58254 8.83481 2.17071 10H1C0.447716 10 0 10.4477 0 11C0 11.5523 0.447716 12 1 12H2.17071ZM6 11C6 11.5523 5.55228 12 5 12C4.44772 12 4 11.5523 4 11C4 10.4477 4.44772 10 5 10C5.55228 10 6 10.4477 6 11Z"
                />
              </svg>
              <span className="btnText">Filter</span>
            </button>
          </Grid>
          <Grid item>
            <button
              type="button"
              className="btn"
              style={{ backgroundColor: "transparent" }}
              disabled={selectedGroup === "Hosted"}
              onClick={() => {
                setAboutDialog(true);
              }}>
              <svg width="14" height="14" viewBox="0 0 12 12" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM5 6C5 5.44772 5.44772 5 6 5C6.55228 5 7 5.44772 7 6V9C7 9.55229 6.55228 10 6 10C5.44772 10 5 9.55229 5 9V6ZM6 4C6.55228 4 7 3.55228 7 3C7 2.44772 6.55228 2 6 2C5.44772 2 5 2.44772 5 3C5 3.55228 5.44772 4 6 4Z"
                />
              </svg>
            </button>
          </Grid>
        </Grid>
      </div>
    </Grid>
  );
};

export default TopBarMenu;
