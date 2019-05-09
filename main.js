const {app, BrowserWindow, Menu} = require('electron');
const path = require('path');
const url = require('url');

process.env.NODE_ENV = 'dev';

let win;
let newWin;

app.on('ready', function(){
    win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    win.on('closed', function(){
        app.quit();
    });
    const menu = Menu.buildFromTemplate(mainMenu);
    Menu.setApplicationMenu(menu);
});

function createNewWindow(winWidth, winHeight, winFile) {
    newWin = new BrowserWindow({
        width: winWidth,
        height: winHeight,
        webPreferences: {
            nodeIntegration: true
        }
    });
    newWin.loadURL(url.format({
        pathname: path.join(__dirname, winFile),
        protocol: 'file:',
        slashes: true
    }));
    console.log(newWin);
}

let mainMenu = [
    ...(process.platform === 'darwin' ? [{
        label: app.getName(),
        submenu: [
          { role: 'about' },
          { type: 'separator' },
          { role: 'services' },
          { type: 'separator' },
          { role: 'hide' },
          { role: 'hideothers' },
          { role: 'unhide' },
          { type: 'separator' },
          { role: 'quit' }
        ]
      }] : []),
    {
        label: 'File',
        submenu: [
            {
                label: 'New',
                accelerator: process.platform == 'darwin' ? 'Command+N' : 'Ctrl+N',
                click(){
                    createNewWindow(300, 200, 'newWindow.html');
                }
            },
            {
                label: 'Clear'
            },
            {
                label: 'Quit',
                accelerator: process.platform == 'darwin' ? 'Command+Q' : 'Ctrl+Q',
                click(){
                    app.quit();
                }
            }
        ]
    }
];

if (process.env.NODE_ENV !== 'prod') {
    mainMenu.push({
        label: 'Dev',
        submenu: [
            {
                label: 'DevTools',
                accelerator: process.platform == 'darwin' ? 'Command+I' : 'Ctrl+I',
                click(){
                    win.webContents.openDevTools();
                }
            },
            {
                role: 'reload'
            }
        ]
    });
}