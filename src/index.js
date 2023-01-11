const { app, BrowserWindow, ipcMain, screen } = require('electron');
const path = require('path');

const createWindow = () => {
    const win = new BrowserWindow({
        width: 1000,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'launcher/preload.js'),
        },
    });
    ipcMain.handle('launch', (event, args) => launch(args));
    win.loadFile('src/launcher/index.html');
    win.setMenu(null);
    win.setIcon('src/img/icon.png');
    win.setResizable(false);
    app.on('window-all-closed', () => {
        if (process.platform !== 'darwin') app.quit()
    })
}
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

function launch(args) {
    if (args == 'jats') {
        const jats = new BrowserWindow({
            movable: false,
            resizable: false,
            maximizable: false,
            frame: false,
            webPreferences: {
                preload: path.join(__dirname, 'game/preload.js'),
            },
        });
        jats.loadFile('src/game/index.html');
        jats.setMenu(null);
        jats.setMenuBarVisibility(false);
        jats.maximize();
        jats.setIcon('src/img/icon.png');
        ipcMain.handle('devtools', () => jats.webContents.openDevTools());
    }
}