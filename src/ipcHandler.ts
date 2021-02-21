import { ipcMain } from "electron";
import sqlite3 from "sqlite3";

const database = new sqlite3.Database("db.sqlite3", (err: Error | null) => {
  // eslint-disable-next-line no-console
  if (err) return console.error("Database opening error: ", err);
  database.on("open", () => {
    database.all("SELECT name FROM sqlite_master WHERE type='table' AND name = 'settings'", (err1, res1) => {
      if (res1.length < 1) {
        database.all("CREATE TABLE IF NOT EXISTS settings (id text NOT NULL PRIMARY KEY, value text)", (err2, res2) => {
          if (err2 == null) {
            database.exec('INSERT INTO settings (id, value) VALUES( "username", "");');
            database.exec('INSERT INTO settings (id, value) VALUES( "sa_exe", "");');
          }
        });
      }
    });
    database.all("SELECT name FROM sqlite_master WHERE type='table' AND name = 'servers'", (err1, res1) => {
      if (res1.length < 1) {
        database.all("CREATE TABLE IF NOT EXISTS servers (groupid text NOT NULL PRIMARY KEY, list text)", (err2, res2) => {
          if (err2 == null) {
            database.exec('INSERT INTO servers (groupid, list) VALUES("Favorites","127.0.0.1:7777");');
            database.exec('INSERT INTO servers (groupid, list) VALUES("Hosted","");');
          }
        });
      }
    });
  });
  return 1;
});

ipcMain.on("asynchronous-message", (event, arg) => {
  const sql = arg;
  database.all(sql, (err, rows) => {
    event.reply("asynchronous-reply", (err && err.message) || rows);
  });
});
