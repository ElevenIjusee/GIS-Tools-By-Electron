import {
  app,
  BrowserWindow,
  protocol,
  Tray,
  ipcMain,
  remote,
  dialog,
} from "electron";
import createProtocol from "umi-plugin-electron-builder/lib/createProtocol";
import path from "path";
// import installExtension, {
//   REACT_DEVELOPER_TOOLS,
// } from 'electron-devtools-installer';

const { spawn } = require("child_process");
// const iconv = require('iconv-lite');
import iconv from "iconv-lite";
// iconv.skipDecodeWarning = true;

const isDevelopment = process.env.NODE_ENV === "development";
let mainWindow: BrowserWindow;
let tray: Tray;
let preWindowSize: windowInfo;

type windowInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
};

protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } },
]);

const createWindow = () => {
  mainWindow = new BrowserWindow({
    width: 1000,
    height: 600,
    minWidth: 800,
    minHeight: 400,
    transparent: true,
    frame: false,
    icon: "./public/image/favicon.ico",
    webPreferences: {
      nodeIntegration: true, //避免require is not definde。
      contextIsolation: false,
      preload: path.join(__dirname, "preload.js"),
      enableRemoteModule: true,
      webSecurity: false,
    },
  });
  if (isDevelopment) {
    mainWindow.loadURL("http://localhost:8000");
    // mainWindow.webContents.openDevTools();
  } else {
    createProtocol("app");
    mainWindow.loadURL("app://./index.html");
    // mainWindow.webContents.openDevTools();
  }
};

app.on("ready", async () => {
  // if (isDevelopment) {
  //   await installExtension(REACT_DEVELOPER_TOOLS);
  // }
  // tray = new Tray('./public/image/favicon.ico');

  createWindow();
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});

//窗口最小化
ipcMain.on("window-mini", (e) => {
  mainWindow.minimize();
});
//窗口最大化/还原
ipcMain.on("window-max", (e) => {
  if (mainWindow.isMaximized()) {
    mainWindow.setSize(preWindowSize.width, preWindowSize.height);
    mainWindow.setPosition(preWindowSize.x, preWindowSize.y);
  } else {
    preWindowSize = mainWindow.getContentBounds();
    mainWindow.maximize();
  }
});
//关闭窗口
ipcMain.on("window-close", (e) => {
  mainWindow.close();
  // app.quit();
});
//打开文件选择框
ipcMain.on("open-fileInput-dialog", (event) => {
  dialog
    .showOpenDialog(mainWindow, { properties: ["openFile", "openDirectory"] })
    .then((result) => {
      event.sender.send("selected-input-directory", result.filePaths);
    });
});
ipcMain.on("open-fileOutput-dialog", (event) => {
  dialog
    .showOpenDialog(mainWindow, { properties: ["openFile", "openDirectory"] })
    .then((result) => {
      event.sender.send("selected-output-directory", result.filePaths);
    });
});
//osgb转3dtiles监听
// let tempStr;
let currentShell: any;
ipcMain.on("osgb-to-3dtile", (e, params) => {
  // tempStr = `${app.getAppPath().slice(0, -18)}`;
  const result = spawn(
    `${
      isDevelopment
        ? app.getAppPath().slice(0, -18)
        : app.getAppPath().slice(0, -19)
    }\\extraResources\\3dtile\\3dtile.exe${params}`,
    {
      encoding: "utf8",
      // cwd: app.getAppPath(), // 子进程的当前工作目录。
      shell: true, // 使用shell命令
    }
  );

  //输出正常情况下的控制台信息
  result.stdout.on("data", function (data: Buffer) {
    mainWindow.webContents.send("dir", "正常" + iconv.decode(data, "cp936"));
  });

  //输出报错信息
  result.stderr.on("data", function (data: Buffer) {
    mainWindow.webContents.send("dir", "出错了" + iconv.decode(data, "cp936"));
    // console.log(iconv.decode("stderr: " + data, 'cp936'));
  });

  //当程序执行完毕后的回调，那个code一般是0
  result.on("exit", function (code: string) {
    mainWindow.webContents.send("dir", "www.ijusee.com");
    // mainWindow.webContents.send('dir', iconv.decode(code, 'cp936'));
    // console.log(iconv.decode("child process exited with code " + code, 'cp936'));
  });
  //关闭时的回调？
  // result.on('close', function() {

  // });
  currentShell = result;
});

ipcMain.on("cancelShell", () => {
  currentShell.kill("SIGINT");
});
