const { contextBridge, ipcRenderer } = require('electron');
const Viz = require('viz.js');
const { Module, render } = require('viz.js/full.render.js');

contextBridge.exposeInMainWorld('electron', {
  selectFolder: () => ipcRenderer.invoke('select-folder'),
  readDirectory: (path) => ipcRenderer.invoke('read-directory', path),
  readFile: (path) => ipcRenderer.invoke('read-file', path),
  runAnalysis: (folderPath) => ipcRenderer.invoke('run-analysis', folderPath),
  getAnalysisInfo: (folderPath) => ipcRenderer.invoke('get-analysis-info', folderPath),
  getFileAnalysisInfo: (filePath) => ipcRenderer.invoke('get-file-analysis-info', filePath),
  getFunctionCallStackAnalysis: (functionName) => ipcRenderer.invoke('function-call-stack-analysis', functionName),
  getFunctionInternalCallStackAnalysis: (filePath, functionName) => ipcRenderer.invoke('function-internal-call-graph-analysis', filePath, functionName),
  vizRender: async (content) => {
    const viz = new Viz({ Module, render }); 
    return await viz.renderString(content);
},
  // renderGraphviz: async (dotContent) => {
  //   return render(dotContent);
  // }
});