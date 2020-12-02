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
  Synchronous file and directory access 
 */

const { app, BrowserWindow, dialog, remote } = require("electron");
const path = require("path");

const { performance,PerformanceObserver } = require("perf_hooks");

var fs = require("fs");
files = fs.readdirSync(__dirname);

var t0 = performance.now();
/*files.forEach(function(file) {
  var contents = fs.readFileSync(__dirname + "/" + file, "utf8");
  console.log(contents);
})*/
fs.readFileSync("./doc.txt","utf8");
var t1 = performance.now();

app.whenReady();

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

console.log("time difference"+(t1-t0));

