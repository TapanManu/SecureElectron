/* 
 * This file is part of the  distribution (https://github.com/aicore/SecureElectron).
 * Copyright (c) 2015 Tapan Manu and Core.ai 
 * 
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but 
 * WITHOUT ANY WARRANTY; without even the implied warranty of 
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU 
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License 
 * along with this program. If not, see http://www.gnu.org/licenses/.
 */

/*
EXPERIMENT: Performance analysis of Asynchronous and synchrounous 
file read operation

AIM:
compares the time taken to perform read operation of various  sized
files and analyses the performance.

*/
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

