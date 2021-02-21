import { ipcRenderer } from "electron";

export default function send(message: string) {
  return new Promise((resolve) => {
    ipcRenderer.once("asynchronous-reply", (_, arg) => {
      resolve(arg);
    });
    ipcRenderer.send("asynchronous-message", message);
  });
}
