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
const fs = require("fs");
const { performance,PerformanceObserver } = require("perf_hooks");
self.addEventListener("message", function(e) {
    let t1 = performance.now();
    fs.readFile(e.data+".txt",(error,data) => {
        if(error){
            console.log(error);
            return;
        }
       //console.log(data.toString());
    });
    //fs.readFileSync(e.data+".txt");
    let t2 = performance.now();
    
    self.postMessage(t2-t1);
  }, false);

