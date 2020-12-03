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

 /* Experiment : Asynchronous file read in Sandbox
    Aim:
    The given experiment aims :
    i)  perform file read operation asynchronously in sandbox context
   
 */
const {VM, NodeVM} = require('vm2');
const { performance,PerformanceObserver } = require('perf_hooks');
const fs = require('fs');
const file = '/home/tapan/vm2/vm2/test/file4.txt'; 
// By providing a file name as second argument you enable breakpoints
let ext = {};

const vm = new NodeVM( {
    console: 'inherit',
    // pass our declared ext variable to the sandbox
    sandbox: { ext },
    require: {
      external: true,
      builtin: ['fs', 'path'],
      root: './',
    },
  } );
try{
    let t = performance.now();
   vm.run(`
        
        module.exports = function fread(){
        const { performance,PerformanceObserver } = require('perf_hooks');
        let t1 = performance.now();
        fs.readFile('../file3.txt', 'utf8', function (err,data) {
            if (err) {
            return console.log(err);
            }
            let t2 = performance.now();
            console.log(t2-t1);
      });
        }
    `);
   let tt = performance.now();
   console.log(tt-t);
}
catch(err){
    console.error('Failed to execute script.', err);
}