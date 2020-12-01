/* 
 * This file is part of the  distribution (https://github.com/aicore/SecureElectron).
 * Copyright (c) 2015 <your name> and Core.ai 
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
var worker = new Worker("worker.js");

const { performance,PerformanceObserver } = require("perf_hooks");


const files = ["file1","file2","file3","file4","file5"];
let t1 = performance.now();

worker.addEventListener("message", function(e) {
  console.log("Time async: ", e.data);
}, false);

worker.postMessage(files[4]); // Send data to our worker.