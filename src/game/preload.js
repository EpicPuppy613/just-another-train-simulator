const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('game', {
    devtools: () => ipcRenderer.invoke("devtools")
    // we can also expose variables, not just functions
})