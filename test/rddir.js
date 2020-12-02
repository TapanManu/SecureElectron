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
directory read operation

AIM:
compares the time taken to perform directory read operation of various 
directories and analyses the performance.

*/
const { app, BrowserWindow, dialog, remote } = require("electron");
const path = require("path");

var fs = require("fs"); // Load the File System to execute our common tasks (CRUD)

const { performance,PerformanceObserver } = require("perf_hooks");
let t0,t1,t2,t3,t4=0,t5=0,t6=0,t7=0;

//list dir async
function ls(){
    t0 = performance.now();
    fs.readdir("./testdir", (err, files) => {
      if(err) 
      {
        throw err;
      }
      files.forEach( (entry) => { 
       //console.log (entry)
      })
      t1 = performance.now();
      console.log("async read:"+(t1-t0)+" ms");
     });
  }

function lssync(){
    t2 = performance.now();
    let stat = fs.lstatSync("./testdir");
    if (stat.isDirectory()){
        let files = fs.readdirSync("./testdir");
        files.forEach( (file) => {
        //console.log(file);
        });
        t3 = performance.now();
        console.log("sync read:"+(t3-t2)+" ms");
    }
}

ls();
lssync();

function ls_rec(flag){
    let temp;
    let stat = fs.lstatSync("./testdir");
    if(stat.isDirectory()){
    fs.readdir("./testdir", (err, files) => {
      if(err) throw err
      files.forEach(entry => { 
       ls_rec(path.join("./testdir",entry),0);
      });
      t5 += performance.now();
      if(flag===1){
        console.log("async recursive read:"+(t5-t4)+" ms");
      }
      
     });
   }
  }

function lssync_rec(flag){
    
    let stat = fs.lstatSync("./testdir");
    if (stat.isDirectory()){
        let files = fs.readdirSync("./testdir");
        files.forEach( file => {
            lssync_rec(path.join("./testdir",file),0);
        })
        t7 = performance.now();
        if(flag===1){
            console.log("sync recursive read:"+(t7-t6)+" ms");
        }
    }
}

t4 = performance.now();
ls_rec(1);


t6 = performance.now();
lssync_rec(1);


app.whenReady();

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

