const { app, BrowserWindow, Menu } = require("electron");
const url = require("url");
const path = require("path");
const { createPublicKey } = require("crypto");
const sql = require('mssql');

if(process.env.NODE_ENV !== 'production') {
  require('electron-reload')(__dirname,{
    electron: path.join(__dirname,'../node_modules','.bin','electron')
  })
}

app.on('ready',() => {
  let mainWindow = new BrowserWindow({
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false
    }
  });
  mainWindow.loadURL(url.format({
    pathname: path.join(__dirname,'views/index.html'),
    protocol: 'file',
    slashes: true
  }))

  // mainWindow.setMenu(null);
  const mainMenu = Menu.buildFromTemplate(templateMenu);
  Menu.setApplicationMenu(mainMenu)
});

const templateMenu = [
  {
    label : 'DevTools',
    submenu : [
      {
        label : 'S/H Dev tools',
        click(item, focusedWindow){
          focusedWindow.toggleDevTools();
        }
      },
      {
        role : 'reload'
      }

    ]

  }
];
