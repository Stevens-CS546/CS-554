const webpack = require("webpack");
const WebpackDevServer = require("webpack-dev-server");
const config = require("./config/webpack.config.dev");
const electron = require("electron");
const port = 9000;
const path = require("path");
const url = require("url");

const options = {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  contentBase: "www",
  stats: { colors: true },
  historyApiFallback: true
};

const server = new WebpackDevServer(webpack(config), options);

server.listen(port, "localhost", function(err) {
  console.log("WebpackDevServer listening at localhost:", port);

  if (err) {
    console.log(err);
    return;
  }

  // Module to control application life.
  const app = electron.app;
  const Menu = electron.Menu;
  // Keep a global reference of the window object, if you don't, the window will
  // be closed automatically when the JavaScript object is garbage collected.
  let mainWindow;

  const menuItems = [
    {
      label: "CS-554-A",
      submenu: [
        { role: "undo" },
        { role: "redo" },
        { type: "separator" },
        { role: "cut" },
        { role: "copy" },
        { role: "paste" },
        { role: "pasteandmatchstyle" },
        { role: "delete" },
        { role: "selectall" }
      ]
    },
    {
      label: "Settings",
      submenu: [
        {
          label: "My Test Submenu",
          submenu: []
        },
        {
          label: "Go to Booklist",
          click: (menuItem, browserWindow, event) => {
            mainWindow.loadURL("http://localhost:9000/books");
          }
        }
      ]
    }
  ];

  const menu = Menu.buildFromTemplate(menuItems);
  Menu.setApplicationMenu(menu);

  // Module to create native browser window.
  const BrowserWindow = electron.BrowserWindow;

  function createWindow() {
    // Create the browser window.
    mainWindow = new BrowserWindow({ width: 800, height: 600 });

    // and load the index.html of the app.
    mainWindow.loadURL(`http://localhost:${port}`);

    // Open the DevTools.
    mainWindow.webContents.openDevTools();

    // Emitted when the window is closed.
    mainWindow.on("closed", function() {
      // Dereference the window object, usually you would store windows
      // in an array if your app supports multi windows, this is the time
      // when you should delete the corresponding element.
      mainWindow = null;
    });
  }

  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  app.on("ready", createWindow);

  // Quit when all windows are closed.
  app.on("window-all-closed", function() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

  app.on("activate", function() {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (mainWindow === null) {
      createWindow();
    }
  });
});
