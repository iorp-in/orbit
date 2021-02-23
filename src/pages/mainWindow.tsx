/* eslint-disable promise/no-nesting */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React, { useCallback, useEffect } from "react";
import path from "path";
import { spawn } from "child_process";
import fs from "fs";
import axios from "axios";
import { Grid } from "@material-ui/core";
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from "@material-ui/lab/Alert";
import ShowCreateGroupDialog from "../components/dialogs/create-group-dialog";
import { IServers, createData, ISettings, IServerData } from "../components/main/interfaces";
import Topbar from "../components/topbar/topbar";
import sendAsync from "../Services/asyncIPC";
import "../App.global.css";
import SibeBarGroups from "../components/main/groups";
import ServersList from "../components/main/servers";
import TopBarMenu from "../components/main/top menu";
import AddServerDialog from "../components/dialogs/add-server-dialog";
import DeleteServerDialog from "../components/dialogs/delete-server-dialog";
import RenameGroupDialog from "../components/dialogs/rename-group-dialog";
import DeleteGroupDialog from "../components/dialogs/delete-group-dialog";
import SettingsDialog from "../components/dialogs/settings";
import getServerInfo from "../Services/samp";
import AboutDialog from "../components/dialogs/about-dialog";

let timeouts: NodeJS.Timeout[] = [];

const MainWindow = () => {
  const [msg, setMsg] = React.useState("No Servers :(");
  const [searchServer, setSearchServer] = React.useState("");
  const [snackBar, setSnackBar] = React.useState({ status: false, severity: "success", text: "Welcome to orbit launcher", duration: 3000 });
  const [loading, setLoading] = React.useState(0);
  const [filter, setFilter] = React.useState(false);
  const [aboutDialog, setAboutDialog] = React.useState(false);
  const [createGroupDialog, setCreateGroupDialog] = React.useState(false);
  const [renameGroupDialog, setRenameGroupDialog] = React.useState(false);
  const [settingsDialog, setSettingsDialog] = React.useState(false);
  const [deleteGroupDialog, setDeleteGroupDialog] = React.useState(false);
  const [deleteServerDialog, setDeleteServerDialog] = React.useState(false);
  const [addServerDialog, setAddServerDialog] = React.useState(false);
  const [loaded, setLoaded] = React.useState(false);
  const [selected, setSelectedID] = React.useState("");
  const [selectedGroup, setSelectedGroup] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [gtaSa, setGtaSA] = React.useState("");
  const [serversList, setServersList] = React.useState("");
  const [servers, setServers] = React.useState([] as IServerData[]);
  const [groups, setGroups] = React.useState([] as string[]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars

  const showNotification = (type: "error" | "success" | "warning" | "info", text: string, duration?: number) => {
    setSnackBar({ status: true, severity: type, text, duration: !duration ? 3000 : duration });
    return 1;
  };

  const handleClose = (_event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setSnackBar({ ...snackBar, status: false });
  };

  const LoadGroupAllHosted = () => {
    return new Promise((resolve) => {
      setServersList("");
      setServers([]);
      setLoading(0);
      setSelectedGroup("Hosted");
      setMsg("Loading...");
      axios
        .get("http://lists.sa-mp.com/0.3.7/hosted")
        .then((res) => {
          const serversArray: string[] = (res.data as string).split("\n");
          serversArray.push("server.iorp.in:7777");
          if (serversArray.length < 1) resolve(true);
          let count = 0;
          for (const srv of serversArray) {
            if (srv.length > 0) {
              count += 1;
              setLoading((value) => value + 1);
              timeouts.push(
                setTimeout(() => {
                  getServerInfo(srv)
                    .then((res3) => {
                      setServers((oldArray) => [
                        ...oldArray,
                        createData(
                          res3.passworded,
                          res3.hostname,
                          res3.realaddress,
                          `${res3.online}/${res3.maxplayers}`,
                          res3.ping,
                          res3.gamemode,
                          res3.mapname,
                          res3.players,
                          res3.rules.mapname,
                          res3.rules.weburl,
                          "Hosted",
                          res3.online,
                          res3.maxplayers
                        ),
                      ]);
                      resolve(true);
                      setLoading((value) => value - 1);
                      return 1;
                    })
                    // eslint-disable-next-line @typescript-eslint/no-unused-vars
                    .catch((_err) => {
                      setServers((oldArray) => [...oldArray, createData(false, srv, srv, "-", 0, "-", "-", [], "-", "-", "Hosted", 0, 0)]);
                      resolve(true);
                      setLoading((value) => value - 1);
                    });
                }, 500 + count * 500)
              );
            }
          }
          setMsg("No Servers :(");
          return null;
        })
        .catch(console.log);
    });
  };

  const LoadGroupAllServers = (group: string) => {
    return new Promise((resolve) => {
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < timeouts.length; i++) {
        clearTimeout(timeouts[i]);
      }
      timeouts = [];
      setLoading(0);
      setServersList("");
      setServers([]);
      setSelectedGroup(group);
      let resp2: IServers[] = [];
      sendAsync(`SELECT * FROM servers where groupid = "${group}"`)
        .then((res) => {
          resp2 = res as IServers[];
          if (resp2.length > 0) {
            if (resp2[0].list.length < 1) resolve(true);
            const serversArray = resp2[0].list.split(",");
            if (serversArray.length < 1) resolve(true);
            let count = 0;
            for (const srv of serversArray) {
              if (srv.length > 0) {
                setLoading((value) => value + 1);
                count += 1;
                timeouts.push(
                  setTimeout(() => {
                    getServerInfo(srv)
                      .then((res3) => {
                        setServers((oldArray) => [
                          ...oldArray,
                          createData(
                            res3.passworded,
                            res3.hostname,
                            res3.realaddress,
                            `${res3.online}/${res3.maxplayers}`,
                            res3.ping,
                            res3.gamemode,
                            res3.mapname,
                            res3.players,
                            res3.rules.mapname,
                            res3.rules.weburl,
                            group,
                            res3.online,
                            res3.maxplayers
                          ),
                        ]);
                        setLoading((value) => value - 1);
                        return res3;
                      })
                      .catch((err) => {
                        setServers((oldArray) => [...oldArray, createData(false, srv, srv, "-", 0, "-", "-", [], "-", "-", group, 0, 0)]);
                        setLoading((value) => value - 1);
                        console.log(err);
                      });
                  }, 300 + count * 300)
                );
              }
            }
            resolve(true);
          }
          return res;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const LoadServer = useCallback((group: string) => {
    LoadGroupAllServers(group);
    return 1;
  }, []);

  const LoadServerInfo = (server: string) => {
    return new Promise((resolve) => {
      getServerInfo(server)
        .then((res3) => {
          const data = createData(
            res3.passworded,
            res3.hostname,
            res3.realaddress,
            `${res3.online}/${res3.maxplayers}`,
            res3.ping,
            res3.gamemode,
            res3.mapname,
            res3.players,
            res3.rules.mapname,
            res3.rules.weburl,
            selectedGroup,
            res3.online,
            res3.maxplayers
          );
          setServers(servers.map((srv) => (srv.address === server ? { ...data } : srv)));
          return res3;
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((_err) => {
          const data = createData(false, server, server, "-", 0, "-", "-", [], "-", "-", selectedGroup, 0, 0);
          setServers(servers.map((item) => (item.address === server ? { ...item, data } : item)));
        });
      resolve(true);
    });
  };

  const LoadGroups = useCallback(async () => {
    try {
      const resp3 = (await sendAsync(`SELECT groupid FROM servers where groupid != "Hosted" and groupid != "Favorites"`)) as { groupid: string }[];
      setGroups([]);
      if (resp3.length > 0) {
        resp3.map((row) => {
          return setGroups((oldArray) => [...oldArray, row.groupid]);
        });
      }
    } catch (err) {
      console.log(err);
    }
    return 1;
  }, []);

  const GetData = useCallback(async () => {
    try {
      const resp = (await sendAsync("SELECT * FROM settings")) as ISettings[];
      setUsername(resp[0].value as string);
      setGtaSA(resp[1].value as string);
      await LoadGroups();
      LoadServer("Favorites");
    } catch (err) {
      console.log(err);
    }
  }, [LoadServer, LoadGroups]);

  const isFileExist = async (filepath: string) => {
    try {
      await fs.promises.access(filepath);
      return true;
    } catch (error) {
      return false;
    }
  };

  const handleConnect = async (password?: undefined | string, rconpassword?: undefined | string) => {
    if (selected.length < 1) return showNotification("error", "no server selected", 1000);
    if (username.length < 1) return showNotification("error", "empty username is not acceptable", 1000);
    if (gtaSa.length < 1) return showNotification("error", "san andreas game directory is not set", 3000);
    if (path.basename(gtaSa) !== "gta_sa.exe") return showNotification("error", "san andreas game directory is invalid", 3000);
    if (!(await isFileExist(gtaSa))) return showNotification("error", "gta_sa.exe not found", 3000);
    const sampPath = path.join(path.dirname(gtaSa), "samp.dll");
    if (!(await isFileExist(sampPath))) return showNotification("error", "SA-MP is not installed, please install SA-MP first", 3000);
    const sampPathExe = path.join(path.dirname(gtaSa), "samp.exe");
    if (!(await isFileExist(sampPathExe))) return showNotification("error", "SA-MP is not installed, please install SA-MP first", 3000);
    showNotification("success", `connecting ${selected}`, 1000);
    spawn("reg", ["add", "HKCU\\Software\\SAMP", "/f", "/v", "gta_sa_exe", "/t", "REG_SZ", "/d", gtaSa]);
    spawn("reg", ["add", "HKCU\\Software\\SAMP", "/f", "/v", "PlayerName", "/t", "REG_SZ", "/d", username]);
    const args: string[] = [selected];
    if (typeof password === "string" && password.length > 0) {
      args.push(`-z${password}`);
    }
    if (typeof rconpassword === "string" && rconpassword.length > 0) {
      args.push(`-c${rconpassword}`);
    }
    spawn(sampPathExe, args);
    return 1;
  };

  useEffect(() => {
    if (!loaded) {
      setLoaded(true);
      GetData();
    }
  }, [loaded, GetData]);

  return (
    <div>
      <Topbar counter={loading} />
      {createGroupDialog && <ShowCreateGroupDialog open={createGroupDialog} setOpen={setCreateGroupDialog} showNotification={showNotification} LoadGroups={LoadGroups} />}
      {aboutDialog && <AboutDialog open={aboutDialog} setOpen={setAboutDialog} />}
      {renameGroupDialog && <RenameGroupDialog open={renameGroupDialog} setOpen={setRenameGroupDialog} showNotification={showNotification} selectedGroup={selectedGroup} LoadGroups={LoadGroups} />}
      {settingsDialog && <SettingsDialog open={settingsDialog} setOpen={setSettingsDialog} showNotification={showNotification} gtaSa={gtaSa} setGtaSA={setGtaSA} />}
      {deleteGroupDialog && (
        <DeleteGroupDialog
          open={deleteGroupDialog}
          setOpen={setDeleteGroupDialog}
          showNotification={showNotification}
          setSelectedID={setSelectedID}
          setSelectedGroup={setSelectedGroup}
          selectedGroup={selectedGroup}
          LoadGroups={LoadGroups}
          LoadServer={LoadServer}
        />
      )}
      {addServerDialog && (
        <AddServerDialog open={addServerDialog} setOpen={setAddServerDialog} showNotification={showNotification} selectedGroup={selectedGroup} LoadServer={LoadServer} serversList={serversList} />
      )}
      {deleteServerDialog && (
        <DeleteServerDialog
          open={deleteServerDialog}
          setOpen={setDeleteServerDialog}
          showNotification={showNotification}
          selected={selected}
          selectedGroup={selectedGroup}
          LoadServer={LoadServer}
          serversList={serversList}
          setSelectedID={setSelectedID}
        />
      )}
      <Snackbar open={snackBar.status} autoHideDuration={snackBar.duration} onClose={handleClose}>
        <MuiAlert onClose={handleClose} severity={snackBar.severity as "success" | "info" | "warning" | "error" | undefined}>
          {snackBar.text}
        </MuiAlert>
      </Snackbar>
      <Grid container direction="row" justify="flex-start" alignItems="center" style={{ borderBottom: "1px solid", borderBottomColor: "#1d1d1f" }}>
        <Grid item xs={2} style={{ borderRight: "1px solid", borderRightColor: "#1d1d1f" }}>
          <div style={{ padding: "4px" }}>
            <input
              type="text"
              placeholder="Search Servers"
              spellCheck="false"
              value={searchServer}
              onChange={(e) => {
                setSearchServer(e.target.value);
              }}
            />
          </div>
        </Grid>
        <TopBarMenu
          filter={filter}
          setFilter={setFilter}
          selected={selected}
          selectedGroup={selectedGroup}
          showNotification={showNotification}
          LoadServer={LoadServer}
          username={username}
          setUsername={setUsername}
          setAddServerDialog={setAddServerDialog}
          setDeleteServerDialog={setDeleteServerDialog}
          handleConnect={handleConnect}
          setSettingsDialog={setSettingsDialog}
          setAboutDialog={setAboutDialog}
        />
      </Grid>
      <Grid container direction="row">
        <SibeBarGroups
          groups={groups}
          selectedGroup={selectedGroup}
          LoadServer={LoadServer}
          setCreateGroupDialog={setCreateGroupDialog}
          setRenameGroupDialog={setRenameGroupDialog}
          setDeleteGroupDialog={setDeleteGroupDialog}
          setSelectedGroup={setSelectedGroup}
          LoadGroupAllServers={LoadGroupAllServers}
          LoadGroupAllHosted={LoadGroupAllHosted}
        />
        <ServersList
          filter={filter}
          searchServer={searchServer}
          msg={msg}
          servers={servers}
          setSelectedID={setSelectedID}
          LoadServerInfo={LoadServerInfo}
          selected={selected}
          selectedGroup={selectedGroup}
          setDeleteServerDialog={setDeleteServerDialog}
          handleConnect={handleConnect}
          loading={loading}
          showNotification={showNotification}
        />
      </Grid>
    </div>
  );
};

export default MainWindow;
