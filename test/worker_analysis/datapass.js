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
var worker = new Worker("worker_analysis/webworker.js");

const { performance,PerformanceObserver } = require("perf_hooks");

//ARRAY
/*let str_data =[];
for(let i=0;i<500;i++){
    str_data.push(i);
}*/

//BLOB
/*const bytes = new Uint8Array(100);
for(let i=0;i<100;i++){
    bytes[i] = 32+i;
}
const blob = new Blob([bytes.buffer],{type:'text/plain'});
*/

//OBJECTS
//var obj = {framework:"electron",web:"worker",numbers:5000,color:"blue"};

//FUNCTION
/*function func(){
    return 5;
}*/

let t1 = performance.now();
worker.addEventListener("message", function(e) {
  console.log("Time async: ", e.data);
}, false);

//console.log(t1);

//worker.postMessage(func()); // Send data to our worker.
worker.postMessage({obj,t1});