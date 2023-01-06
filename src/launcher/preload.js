const { contextBridge, ipcRenderer } = require('electron')

contextBridge.exposeInMainWorld('launcher', {
    launch: (args) => ipcRenderer.invoke("launch", args)
    // we can also expose variables, not just functions
})