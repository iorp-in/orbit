/* eslint-disable promise/no-nesting */
/* eslint-disable no-restricted-syntax */
/* eslint-disable no-console */
import React, { useCallback, useEffect } from "react";
import path from "path";
import { spawn } from "child_process";
import fs from "fs";
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

const MainWindow = () => {
  const [snackBar, setSnackBar] = React.useState({ status: false, severity: "success", text: "Welcome to orbit launcher", duration: 3000 });
  const [loading, setLoading] = React.useState(0);
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
      setSelectedGroup("Hosted");
      const serversArray: string[] = [
        "149.56.35.132:7777",
        "193.70.80.220:2242",
        "185.169.134.91:7777",
        "46.174.49.170:7777",
        "35.199.120.100:7777",
        "194.93.2.146:7777",
        "server.iorp.in:7777",
        "185.169.134.84:7777",
        "176.32.37.29:7777",
        "176.32.37.191:7777",
        "198.50.195.143:7780",
        "46.174.51.182:7774",
        "185.169.134.164:7777",
        "198.50.158.121:7777",
        "37.230.228.106:7777",
        "78.67.214.40:7777",
        "144.217.19.108:2020",
        "176.32.37.13:7777",
        "91.134.166.74:7000",
        "176.32.37.199:7777",
        "167.114.42.236:7777",
        "176.32.39.199:7777",
        "37.187.154.36:8801",
        "54.37.142.74:7777",
        "54.39.125.4:7797",
        "51.81.9.234:7777",
        "5.196.143.97:7787",
        "176.32.39.151:7777",
        "167.114.42.237:7777",
        "46.174.54.102:7777",
        "176.32.36.213:7777",
        "142.44.253.147:7777",
        "176.32.36.95:7777",
        "51.89.188.190:7777",
        "51.81.9.232:7777",
        "176.32.39.10:7777",
        "51.89.124.201:7777",
        "192.95.55.65:7777",
        "51.75.33.153:7777",
        "91.134.166.78:7658",
        "158.69.141.9:7777",
        "51.222.21.136:7777",
        "145.239.172.233:7777",
        "80.93.220.67:7777",
        "176.32.39.174:7777",
        "51.195.238.176:7777",
        "37.187.196.107:7777",
        "176.32.36.130:7777",
        "185.137.235.68:7777",
        "51.222.128.73:7777",
        "62.122.213.28:7777",
        "189.127.164.28:7777",
        "176.32.39.21:7777",
        "178.32.234.18:7777",
        "51.161.33.212:7777",
        "194.93.2.197:7777",
        "176.32.39.36:7777",
        "198.50.176.18:7777",
        "176.32.39.176:7777",
        "51.83.207.242:7777",
        "176.32.37.100:7777",
        "192.99.251.103:7777",
        "167.88.15.123:7777",
        "176.32.39.141:7777",
        "185.169.134.68:7777",
        "198.50.195.141:7772",
        "91.121.237.131:5555",
        "198.50.195.141:7778",
        "46.174.48.230:7777",
        "54.39.38.83:7771",
        "213.239.198.139:7777",
        "95.181.158.20:7777",
        "217.106.104.50:7777",
        "46.174.55.87:7777",
        "188.166.88.79:7777",
        "135.148.59.56:7777",
        "185.211.247.111:7060",
        "167.114.36.179:8888",
        "185.169.134.85:7777",
        "51.89.124.201:7792",
        "37.230.162.217:7777",
        "185.169.134.171:7777",
        "176.32.39.165:7777",
        "83.166.245.119:7777",
        "91.134.166.76:7777",
        "80.72.41.158:7777",
        "176.32.37.93:7777",
        "51.254.85.134:7776",
        "145.239.172.235:7777",
        "144.217.19.111:7777",
        "176.32.37.18:7777",
        "217.182.36.95:7777",
        "144.217.62.158:7777",
        "46.174.51.182:7775",
        "185.169.134.59:7777",
        "51.68.204.178:7777",
        "135.148.38.32:7777",
        "188.165.219.63:8800",
        "104.131.30.51:9999",
        "145.239.172.235:7787",
        "217.106.104.85:7777",
        "91.134.166.76:8085",
        "46.174.55.97:7777",
        "91.121.237.130:7000",
        "108.168.5.146:7777",
        "185.71.66.95:7771",
        "176.32.37.251:7777",
        "145.239.81.51:7777",
        "46.174.55.169:7777",
        "80.72.41.158:7770",
        "193.70.94.12:7777",
        "144.217.19.105:8989",
        "54.39.38.85:5555",
        "46.174.49.142:7777",
        "194.93.2.248:7777",
        "54.39.196.70:7777",
        "192.99.223.143:7777",
        "185.71.66.95:7773",
        "144.217.171.90:7777",
        "80.93.220.90:7777",
        "46.174.51.182:7772",
        "176.32.39.168:7777",
        "51.75.33.152:7777",
        "51.178.138.254:7777",
        "142.44.253.11:7732",
        "185.169.134.109:7777",
        "185.169.134.173:7777",
        "176.32.39.132:7777",
        "158.69.4.20:7777",
        "192.95.36.104:7777",
        "185.169.134.172:7777",
        "51.89.61.68:7777",
        "176.32.39.178:7777",
        "158.69.5.116:7777",
        "176.32.39.131:7777",
        "185.169.134.43:7777",
        "46.174.50.223:7777",
        "46.174.50.193:7777",
        "185.169.134.83:7777",
        "51.38.163.69:7777",
        "142.44.255.127:7777",
        "176.31.198.246:7777",
        "176.32.36.73:7777",
        "149.62.148.12:7777",
        "51.254.101.103:7777",
        "46.174.52.246:7777",
        "176.32.39.4:7777",
        "5.9.115.244:7777",
        "185.71.66.95:7772",
        "176.32.39.129:7777",
        "54.38.156.202:7777",
        "51.38.122.59:7777",
        "46.174.53.91:7777",
        "185.169.134.165:7777",
        "176.32.37.19:7777",
        "91.121.237.128:1795",
        "176.32.39.145:7777",
        "158.69.133.164:7777",
        "185.71.66.95:7775",
        "54.39.28.148:7777",
        "198.50.231.216:7777",
        "51.254.178.238:7777",
        "135.148.64.133:7777",
        "92.63.192.49:7777",
        "142.44.227.185:7779",
        "80.72.41.158:7755",
        "213.32.6.232:7777",
        "193.203.39.216:7777",
        "176.32.39.136:7777",
        "176.32.39.200:7777",
        "80.241.214.32:7777",
        "51.83.207.243:7777",
        "51.83.207.240:7777",
        "51.89.188.191:7777",
        "185.169.134.174:7777",
        "46.174.51.182:7771",
        "46.174.54.184:7777",
        "51.210.180.137:7777",
        "142.4.209.23:7777",
        "185.169.134.67:7777",
        "217.182.46.69:7777",
        "37.122.140.8:7777",
        "194.93.2.198:7777",
        "135.181.113.179:7777",
        "149.56.41.52:7720",
        "151.80.47.38:7777",
        "54.39.122.56:7777",
        "198.100.154.62:7777",
        "46.174.53.218:7777",
        "80.93.220.80:7777",
        "185.71.66.95:7777",
        "145.239.183.130:7777",
        "95.111.226.28:7777",
        "139.99.61.40:7777",
        "45.77.136.23:7777",
        "176.32.36.246:7777",
        "51.75.33.154:7777",
        "176.32.39.180:7777",
        "87.98.244.35:7000",
        "185.169.134.61:7777",
        "51.222.22.65:7778",
        "176.32.37.188:7777",
        "176.32.37.185:7777",
        "110.22.89.249:7778",
        "110.22.89.249:7777",
        "178.32.234.17:7777",
        "83.222.116.222:1111",
        "147.135.27.142:7777",
        "176.32.36.4:5555",
        "51.38.122.59:5555",
        "46.174.48.161:7777",
        "46.174.50.46:7844",
        "217.160.240.99:7777",
        "192.99.185.72:7777",
        "176.32.37.36:7777",
        "91.121.237.130:7779",
        "46.174.54.175:7777",
        "178.63.13.143:16705",
        "149.202.65.49:7777",
        "149.56.41.49:7787",
        "46.174.51.182:7773",
        "192.99.251.103:7792",
        "51.89.61.67:7777",
        "172.107.2.27:8562",
        "185.169.134.4:7777",
        "185.169.134.3:7777",
        "185.169.134.44:7777",
        "62.122.214.40:7777",
        "45.77.73.234:7778",
        "185.169.134.5:7777",
        "176.32.37.25:7777",
        "198.50.187.243:7777",
        "176.32.37.22:7777",
        "46.174.53.214:7777",
        "176.32.37.14:7777",
        "95.181.152.163:7777",
        "54.39.115.96:7777",
        "213.166.86.23:7777",
        "176.32.37.38:7777",
        "54.39.115.101:17771",
        "176.32.39.198:7777",
        "176.32.36.98:7777",
        "192.99.238.126:7777",
        "185.169.134.107:7777",
        "37.187.77.206:7777",
        "91.121.90.218:7777",
        "176.32.37.200:7777",
        "46.174.53.247:7777",
        "194.93.2.156:7777",
        "185.71.66.95:7774",
        "51.81.81.145:7750",
        "37.122.140.2:7777",
        "158.69.123.67:7852",
        "46.174.53.176:7777",
        "46.174.50.20:7805",
        "188.165.127.145:7777",
        "46.174.49.47:7781",
        "80.66.82.219:7777",
        "46.174.50.20:7782",
        "149.56.45.135:7777",
        "176.32.37.183:7777",
        "185.198.188.98:7777",
        "185.169.134.45:7777",
        "185.169.134.166:7777",
        "217.106.106.86:7177",
        "198.50.195.142:7774",
        "217.106.106.102:7777",
        "51.83.207.241:7777",
        "176.32.39.172:7777",
        "145.239.16.20:7777",
        "51.254.21.27:7777",
        "81.163.31.238:7777",
        "193.70.126.129:4028",
        "46.174.51.153:7777",
        "167.114.205.73:7777",
        "77.220.180.161:7777",
        "176.32.39.17:7777",
        "51.222.12.92:7777",
        "62.122.214.204:7777",
        "80.72.41.158:7754",
      ];
      if (serversArray.length < 1) resolve(true);
      let count = 0;
      for (const srv of serversArray) {
        if (srv.length > 0) {
          count += 1;
          setLoading((value) => value + 1);
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
                    res3.rules.weburl
                  ),
                ]);
                resolve(true);
                setLoading((value) => value - 1);
                return 1;
              })
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              .catch((_err) => {
                setServers((oldArray) => [...oldArray, createData(false, srv, srv, "-", 0, "-", "-", [], "-", "-")]);
                resolve(true);
                setLoading((value) => value - 1);
              });
          }, 500 + count * 500);
        }
      }
    });
  };

  const LoadGroupAllServers = (group: string) => {
    return new Promise((resolve) => {
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
                          res3.rules.weburl
                        ),
                      ]);
                      setLoading((value) => value - 1);
                      return res3;
                    })
                    .catch((err) => {
                      setServers((oldArray) => [...oldArray, createData(false, srv, srv, "-", 0, "-", "-", [], "-", "-")]);
                      setLoading((value) => value - 1);
                      console.log(err);
                    });
                }, 300 + count * 300);
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
            res3.rules.weburl
          );
          setServers(servers.map((srv) => (srv.address === server ? { ...data } : srv)));
          return res3;
        })
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .catch((_err) => {
          const data = createData(false, server, server, "-", 0, "-", "-", [], "-", "-");
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
            <input type="text" placeholder="Search Servers" spellCheck="false" />
          </div>
        </Grid>
        <TopBarMenu
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
        />
      </Grid>
      <Grid container direction="row">
        <SibeBarGroups
          groups={groups}
          setSelected={setSelectedID}
          selectedGroup={selectedGroup}
          LoadServer={LoadServer}
          setCreateGroupDialog={setCreateGroupDialog}
          setRenameGroupDialog={setRenameGroupDialog}
          setDeleteGroupDialog={setDeleteGroupDialog}
          setSelectedGroup={setSelectedGroup}
          LoadGroupAllServers={LoadGroupAllServers}
          LoadGroupAllHosted={LoadGroupAllHosted}
          loading={loading}
          showNotification={showNotification}
        />
        <ServersList
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
