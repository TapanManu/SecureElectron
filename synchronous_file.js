const { app, BrowserWindow, dialog, remote } = require('electron')
const path = require('path');

const { performance,PerformanceObserver } = require('perf_hooks');

var fs = require('fs'),
files = fs.readdirSync(__dirname);

var t0 = performance.now();
/*files.forEach(function(file) {
  var contents = fs.readFileSync(__dirname + '/' + file, 'utf8');
  console.log(contents);
})*/
fs.readFileSync(__dirname+'/doc.txt','utf8');
var t1 = performance.now();

app.whenReady();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

console.log('time difference'+(t1-t0));

