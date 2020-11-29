const { app, BrowserWindow } = require("electron");
const path = require("path");
const fs = require("fs");
const { performance,PerformanceObserver } = require("perf_hooks");
var t0 = performance.now();
let t1;
fs.readFile("./test/file3.txt",(error,data) => {
    if(error){
        console.log(error);
        return;
    }
   //console.log(data.toString());
    t1 = performance.now();
    console.log("time taken "+(t1-t0) +" ms");
});

let t2 = performance.now();
let t3;
fs.readFileSync("./test/file3.txt");
t3 = performance.now();
console.log("sync time:"+(t3-t2)+" ms");

app.whenReady();

app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
      app.quit();
    }
  });

