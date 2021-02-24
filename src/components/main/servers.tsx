/* eslint-disable no-console */
import React from "react";
import { Checkbox, FormControlLabel, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Menu, Item, useContextMenu, ItemParams } from "react-contexify";
import { columns, IServerData } from "./interfaces";
import PlayersDialog from "../dialogs/players-dialog";
import ServerInfoDialog from "../dialogs/server-info-dialog";

const MENU_ID = "server-context-menu";

const useStyles = makeStyles({
  label: {
    "& .MuiTypography-root": {
      fontSize: "12px",
    },
  },
  checkbox: {
    color: "white !important",
  },
  container: {
    maxHeight: "calc(100vh - 75px)",
    "& table": {
      "& $tr:hover": {
        backgroundColor: "#7232DA33",
        "& td": {
          backgroundColor: "#7232DA33",
        },
      },
      "& tr": {
        "& th": {
          borderBottom: "solid 1px",
          borderBottomColor: "#1d1d1f",
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

const ServersList = ({
  msg,
  servers,
  setSelectedID,
  setDeleteServerDialog,
  selected,
  selectedGroup,
  handleConnect,
  LoadServerInfo,
  loading,
  searchServer,
  showNotification,
  filter,
}: {
  servers: IServerData[];
  setSelectedID: React.Dispatch<React.SetStateAction<string>>;
  setDeleteServerDialog: React.Dispatch<React.SetStateAction<boolean>>;
  filter: boolean;
  selected: string;
  msg: string;
  searchServer: string;
  selectedGroup: string;
  handleConnect: (password?: undefined | string, rconpassword?: undefined | string) => Promise<number>;
  LoadServerInfo: (server: string) => Promise<unknown>;
  loading: number;
  showNotification: (type: "error" | "success" | "warning" | "info", text: string) => unknown;
}) => {
  const [filterMode, setFilterMode] = React.useState("");
  const [filterLanguage, setFilterLanguage] = React.useState("");
  const [filterNotFull, setFilterNotFull] = React.useState(false);
  const [filterNotEmpty, setFilterNotEmpty] = React.useState(false);
  const [filterNoPassword, setFilterNoPassword] = React.useState(false);
  const [serverInfoDialog, setServerInfoDialog] = React.useState(false);
  const [playersDialog, setPlayersDialog] = React.useState(false);
  const classes = useStyles();
  const { show } = useContextMenu({ id: MENU_ID });

  const handleServerContext = async (name: string, e: React.MouseEvent<HTMLTableRowElement, MouseEvent>) => {
    e.preventDefault();
    setSelectedID(name);
    show(e, { props: { key: name } });
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleItem = (args: ItemParams<any, any>) => {
    const name = args.props.key;
    console.log(name);
    return 1;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleItemDelete = (_args: ItemParams<any, any>) => {
    setDeleteServerDialog(true);
    return 1;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleItemPlayers = (_args: ItemParams<any, any>) => {
    const fServers = servers.filter((res) => res.address === selected);
    if (fServers.length < 1) return 1;
    const serverdata = fServers[0];
    if (serverdata.onlinePlayers < 1) return showNotification("warning", "there is no player in this server!");
    if (serverdata.onlinePlayers > 99) return showNotification("warning", "can not show players list from this server!");
    setPlayersDialog(true);
    return 1;
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleItemServerInfo = (_args: ItemParams<any, any>) => {
    setServerInfoDialog(true);
    return 1;
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  const handleItemConnect = (_args: ItemParams<any, any>) => {
    handleConnect();
    return 1;
  };

  return (
    <Grid item xs={10}>
      {playersDialog && <PlayersDialog open={playersDialog} setOpen={setPlayersDialog} serverdata={servers.filter((res) => res.address === selected)[0]} />}
      {serverInfoDialog && (
        <ServerInfoDialog
          open={serverInfoDialog}
          setOpen={setServerInfoDialog}
          serverdata={servers.filter((res) => res.address === selected)[0]}
          showNotification={showNotification}
          handleConnect={handleConnect}
        />
      )}
      <Menu id={MENU_ID} theme="dark">
        <Item onClick={handleItemConnect}>
          <div style={{ display: "flex" }}>
            <svg width="12" height="13" viewBox="0 0 12 14" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 12.4844C0 13.5818 1.20522 14.2526 2.13785 13.6742L10.9815 8.18977C11.8643 7.64225 11.8643 6.35772 10.9815 5.81021L2.13785 0.325785C1.20522 -0.252591 0 0.418151 0 1.51557V12.4844Z"
              />
            </svg>
            <span style={{ fontSize: "12px", paddingLeft: "10px" }}>Connect</span>
          </div>
        </Item>
        {selectedGroup !== "Hosted" && (
          <Item onClick={handleItemDelete}>
            <div style={{ display: "flex" }}>
              <svg width="12" height="13" viewBox="0 0 12 14" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 1C4 0.447715 4.44772 0 5 0H7C7.55228 0 8 0.447715 8 1H11C11.5523 1 12 1.44772 12 2C12 2.55228 11.5523 3 11 3H1C0.447715 3 0 2.55228 0 2C0 1.44772 0.447715 1 1 1H4Z" />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M3 4C1.89543 4 1 4.89543 1 6V11C1 12.1046 1.89543 13 3 13H9C10.1046 13 11 12.1046 11 11V6C11 4.89543 10.1046 4 9 4H3ZM4 6C3.44772 6 3 6.44772 3 7V10C3 10.5523 3.44772 11 4 11C4.55228 11 5 10.5523 5 10V7C5 6.44772 4.55228 6 4 6ZM7 7C7 6.44772 7.44772 6 8 6C8.55228 6 9 6.44772 9 7V10C9 10.5523 8.55228 11 8 11C7.44772 11 7 10.5523 7 10V7Z"
                />
              </svg>
              <span style={{ fontSize: "12px", paddingLeft: "10px" }}>Delete</span>
            </div>
          </Item>
        )}
        {selectedGroup === "Hosted2" && (
          <Item onClick={handleItem}>
            <div style={{ display: "flex" }}>
              <svg width="12" height="13" viewBox="0 0 12 13" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M11.7071 4.29289C12.0976 4.68342 12.0976 5.31658 11.7071 5.70711L7.70711 9.70711C7.31658 10.0976 6.68342 10.0976 6.29289 9.70711C5.90237 9.31658 5.90237 8.68342 6.29289 8.29289L8.58579 6L1 6C0.447715 6 -2.42698e-07 5.55228 -2.18557e-07 5C-1.94416e-07 4.44771 0.447715 4 1 4L8.58579 4L6.29289 1.70711C5.90237 1.31658 5.90237 0.683417 6.29289 0.292893C6.68342 -0.0976313 7.31658 -0.0976313 7.70711 0.292893L11.7071 4.29289Z"
                />
              </svg>
              <span style={{ fontSize: "12px", paddingLeft: "10px" }}>Move</span>
            </div>
          </Item>
        )}
        {selectedGroup === "Hosted2" && (
          <Item onClick={handleItem}>
            <div style={{ display: "flex" }}>
              <svg width="12" height="13" viewBox="0 0 11 13" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
                <path d="M2 0C0.895431 0 0 0.895431 0 2V9C0 10.1046 0.89543 11 2 11H7C8.10457 11 9 10.1046 9 9V2C9 0.895431 8.10457 0 7 0H2Z" />
                <path d="M9 13H4C3.25972 13 2.61337 12.5978 2.26756 12H8C9.10457 12 10 11.1046 10 10V2.26756C10.5978 2.61337 11 3.25972 11 4V11C11 12.1046 10.1046 13 9 13Z" />
              </svg>
              <span style={{ fontSize: "12px", paddingLeft: "10px" }}>Copy Server Info</span>
            </div>
          </Item>
        )}
        <Item onClick={handleItemServerInfo}>
          <div style={{ display: "flex" }}>
            <svg width="12" height="13" viewBox="0 0 12 12" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 6C12 9.31371 9.31371 12 6 12C2.68629 12 0 9.31371 0 6C0 2.68629 2.68629 0 6 0C9.31371 0 12 2.68629 12 6ZM5 6C5 5.44772 5.44772 5 6 5C6.55228 5 7 5.44772 7 6V9C7 9.55229 6.55228 10 6 10C5.44772 10 5 9.55229 5 9V6ZM6 4C6.55228 4 7 3.55228 7 3C7 2.44772 6.55228 2 6 2C5.44772 2 5 2.44772 5 3C5 3.55228 5.44772 4 6 4Z"
              />
            </svg>
            <span style={{ fontSize: "12px", paddingLeft: "10px" }}>Server Properties</span>
          </div>
        </Item>
        <Item onClick={handleItemPlayers}>
          <div style={{ display: "flex" }}>
            <svg width="12" height="13" viewBox="0 0 16 12" fill="#F5F5F5" xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 7C9.10457 7 10 6.10457 10 5C10 3.89543 9.10457 3 8 3C6.89543 3 6 3.89543 6 5C6 6.10457 6.89543 7 8 7ZM4 10C4 10.1692 4.01051 10.336 4.03091 10.4997C5.08866 11.4334 6.47816 12 8 12C9.52184 12 10.9113 11.4334 11.9691 10.4997C11.9895 10.336 12 10.1692 12 10C12 8.69147 11.3717 7.5297 10.4003 6.79992C9.85296 7.52864 8.98153 8 8 8C7.01847 8 6.14704 7.52863 5.59972 6.79992C4.62832 7.5297 4 8.69147 4 10Z"
              />
              <path d="M5.584 3.2212C5.21826 3.6949 4.64476 4 4 4C2.89543 4 2 3.10457 2 2C2 0.895431 2.89543 0 4 0C5.10457 0 6 0.895431 6 2C6 2.44074 5.85743 2.84819 5.6159 3.17873C5.60515 3.19279 5.59451 3.20695 5.584 3.2212Z" />
              <path d="M5.00487 4.82757C4.69072 4.93922 4.35246 5 4 5C3.01847 5 2.14704 4.52864 1.59972 3.79992C0.628321 4.5297 0 5.69147 0 7C0 7.16922 0.0105081 7.33599 0.0309073 7.49969C0.87937 8.24867 1.9413 8.76142 3.11377 8.935C3.37281 7.74176 4.05779 6.70756 4.99907 6.00041L5.13646 5.89719C5.04779 5.6139 5 5.31253 5 5C5 4.94213 5.00164 4.88463 5.00487 4.82757Z" />
              <path d="M14 2C14 3.10457 13.1046 4 12 4C11.3552 4 10.7817 3.6949 10.416 3.2212C10.4055 3.20695 10.3949 3.19279 10.3841 3.17873C10.1426 2.84819 10 2.44074 10 2C10 0.895431 10.8954 0 12 0C13.1046 0 14 0.895431 14 2Z" />
              <path d="M12.8862 8.935C14.0587 8.76142 15.1206 8.24867 15.9691 7.49969C15.9895 7.33599 16 7.16922 16 7C16 5.69147 15.3717 4.5297 14.4003 3.79992C13.853 4.52864 12.9815 5 12 5C11.6475 5 11.3093 4.93922 10.9951 4.82757C10.9984 4.88463 11 4.94213 11 5C11 5.31253 10.9522 5.6139 10.8635 5.89719L11.0009 6.00041C11.9422 6.70756 12.6272 7.74176 12.8862 8.935Z" />
            </svg>
            <span style={{ fontSize: "12px", paddingLeft: "10px" }}>Player List</span>
          </div>
        </Item>
      </Menu>
      {servers.length < 1 && (
        <div style={{ margin: 0, position: "absolute", top: "50%", left: "56%", transform: "translate(-50%, -50%)" }}>
          <h1>{msg}</h1>
        </div>
      )}
      {filter && (
        <div style={{ padding: "4px", margin: "auto" }}>
          <Grid container>
            <Grid item>
              <div style={{ padding: "4px" }}>
                <input
                  type="text"
                  placeholder="Mode..."
                  spellCheck="false"
                  value={filterMode}
                  onChange={(e) => {
                    setFilterMode(e.target.value);
                  }}
                />
              </div>
            </Grid>
            <Grid item>
              <div style={{ padding: "4px" }}>
                <input
                  type="text"
                  placeholder="Language..."
                  spellCheck="false"
                  value={filterLanguage}
                  onChange={(e) => {
                    setFilterLanguage(e.target.value);
                  }}
                />
              </div>
            </Grid>
            <Grid item>
              <FormControlLabel
                className={classes.label}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={filterNotFull}
                    onChange={(e) => {
                      setFilterNotFull(e.target.checked);
                    }}
                  />
                }
                color="default"
                label="Not Full"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                className={classes.label}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={filterNotEmpty}
                    onChange={(e) => {
                      setFilterNotEmpty(e.target.checked);
                    }}
                  />
                }
                color="default"
                label="Not Empty"
              />
            </Grid>
            <Grid item>
              <FormControlLabel
                className={classes.label}
                control={
                  <Checkbox
                    className={classes.checkbox}
                    checked={filterNoPassword}
                    onChange={(e) => {
                      setFilterNoPassword(e.target.checked);
                    }}
                  />
                }
                color="default"
                label="No Password"
              />
            </Grid>
          </Grid>
        </div>
      )}
      {servers.length > 0 && (
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                {columns.map((column, index) => (
                  <TableCell key={`${column.id}-${String(index)}-columns`} align={column.align}>
                    {column.icon !== undefined && column.icon} {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {servers
                .filter((srv) => (searchServer.length < 1 ? srv : srv.hostname.toLocaleUpperCase().match(searchServer.toLocaleUpperCase().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"))))
                .filter((srv) => (filterMode.length < 1 ? srv : srv.gamemode.toLocaleUpperCase().match(filterMode.toLocaleUpperCase().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"))))
                .filter((srv) => (filterLanguage.length < 1 ? srv : srv.language.toLocaleUpperCase().match(filterLanguage.toLocaleUpperCase().replace(/([.?*+^$[\]\\(){}|-])/g, "\\$1"))))
                .filter((srv) => srv.group === selectedGroup)
                .filter((srv) => (filterNotFull ? srv.onlinePlayers !== srv.maxPlayers : srv))
                .filter((srv) => (filterNotEmpty ? srv.onlinePlayers !== 0 : srv))
                .filter((srv) => (filterNoPassword ? !srv.lock : srv))
                .filter((srv) => srv.group === selectedGroup)
                .filter((srv) => srv.group === selectedGroup)
                .map((row, index) => {
                  return (
                    <TableRow
                      role="checkbox"
                      tabIndex={-1}
                      key={`${row.address}-${String(index)}-servers`}
                      onClick={() => {
                        setSelectedID(row.address);
                        if (loading > 0) {
                          showNotification("warning", `wait for ${loading} servers to fetch details`);
                        } else {
                          LoadServerInfo(row.address);
                        }
                      }}
                      onDoubleClick={() => {
                        setServerInfoDialog(true);
                      }}
                      onContextMenu={(e) => {
                        handleServerContext(row.address, e);
                      }}
                      className={row.address === selected ? "active" : "noactive"}
                      selected={row.address === selected}>
                      {columns.map((column, index2) => {
                        const value = row[column.id];
                        if (column.id === "lock") {
                          return (
                            <TableCell key={`${column.id}-${row.address}-${String(index2)}-colmuns-2`} align={column.align}>
                              {value ? (
                                <div style={{ textAlign: "center" }}>
                                  <svg width="10" height="12" viewBox="0 0 10 12" fill="#ffAB00" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8Z" />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M2 3C2 1.34315 3.34315 0 5 0C6.65685 0 8 1.34315 8 3V4C9.10457 4 10 4.89543 10 6V10C10 11.1046 9.10457 12 8 12H2C0.89543 12 0 11.1046 0 10V6C0 4.89543 0.895432 4 2 4V3ZM2 5C1.44772 5 1 5.44772 1 6V10C1 10.5523 1.44772 11 2 11H8C8.55228 11 9 10.5523 9 10V6C9 5.44772 8.55228 5 8 5H2ZM7 4H3V3C3 1.89543 3.89543 1 5 1C6.10457 1 7 1.89543 7 3V4Z"
                                    />
                                  </svg>
                                </div>
                              ) : (
                                <div style={{ textAlign: "center" }}>
                                  <svg width="10" height="12" viewBox="0 0 10 12" fill="#ABABAB" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M6 8C6 8.55228 5.55228 9 5 9C4.44772 9 4 8.55228 4 8C4 7.44772 4.44772 7 5 7C5.55228 7 6 7.44772 6 8Z" />
                                    <path
                                      fillRule="evenodd"
                                      clipRule="evenodd"
                                      d="M2 3C2 1.34315 3.34315 0 5 0C6.65685 0 8 1.34315 8 3V4C9.10457 4 10 4.89543 10 6V10C10 11.1046 9.10457 12 8 12H2C0.89543 12 0 11.1046 0 10V6C0 4.89543 0.895432 4 2 4V3ZM2 5C1.44772 5 1 5.44772 1 6V10C1 10.5523 1.44772 11 2 11H8C8.55228 11 9 10.5523 9 10V6C9 5.44772 8.55228 5 8 5H2ZM7 4H3V3C3 1.89543 3.89543 1 5 1C6.10457 1 7 1.89543 7 3V4Z"
                                    />
                                  </svg>
                                </div>
                              )}
                            </TableCell>
                          );
                        }
                        return (
                          <TableCell key={`${column.id}-${row.address}-${String(index)}`} align={column.align}>
                            {value}
                          </TableCell>
                        );
                      })}
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Grid>
  );
};

export default ServersList;
