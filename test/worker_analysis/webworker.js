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
EXPERIMENT: Performance analysis of various javascript objects read operation
in web workers

AIM:
compares the time taken to perform read operation of various 
objects and analyses the performance.

*/

const { performance,PerformanceObserver } = require("perf_hooks");
self.addEventListener("message", function(e) {
    let t2 = performance.now();
    console.log(e.data.func);
    self.postMessage(t2);
  }, false);

