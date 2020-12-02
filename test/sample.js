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
Experiment: Performance Analysis of file content transfer through 
            Webworkers
            
Aim: Webworker is created to pass the file content and observe the performance
     of different size files.



*/


var worker = new Worker("worker.js");

const fs = require("fs");
const { performance,PerformanceObserver } = require("perf_hooks");

let content = "Default";
/*fs.readFile('./file5.txt', 'utf8', function (err,data) {
  if (err) {
    return console.log(err);
  }
  let t1 = performance.now();
  worker.postMessage({data,t1}); // Send data to our worker.
});*/

//uncomment the below code if to analyse synchronous transfer

//synchronous read

let t1 = performance.now();
let sync = fs.readFileSync("./file5.txt");
worker.postMessage({sync,t1});


worker.addEventListener("message", function(e) {
  console.log("Time async: ", e.data);
}, false);

