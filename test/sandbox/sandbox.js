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
in VM2 Sandbox

AIM:
compares the time taken to perform read operation of various 
objects and analyses the performance.

*/


const { NodeVM } = require('vm2');
const { performance } = require("perf_hooks");

let t;
const sandbox = {
  get_input(data) {
    return 'input:' + data;
  },
  display(time) {
    console.log('Time:', time);
    
  }
}

const vm = new NodeVM({
  console:"inherit",
  sandbox: { sandbox },
  require: {
    external: true,
    builtin: ["fs","perf_hooks"],
    root: "./",
  },
});

/*
vm.run(`
let str_data =[];
for(let i=0;i<500;i++){
    str_data.push(i.toString());
}
const ret = get_input(str_data[1]);
display(ret);
`);

vm.run(`
    const bytes = new Uint8Array(10);
    for(let i=0;i<10;i++){
        bytes[i] = 32+i;
    }
    const blob = new Blob([bytes.buffer],{type:'text/plain'});
    display(blob);
`);

vm.run(`
    var obj = {framework:"electron",web:"worker",numbers:5000,color:"blue"};
    const ret = get_input(obj['framework']);
    display(ret);
`);
*/

try{
  /*vm.run(`
      const {performance}  = require("perf_hooks");
      const strArray = ["hello","hi","strings"];
      let t1 = performance.now();
      sandbox.get_input(strArray[0]);
      let t2 = performance.now();
      sandbox.display(t2-t1);
  `);*/
  /*
  vm.run(`
      const {performance}  = require("perf_hooks");
      let str_data =[];
      for(let i=0;i<500;i++){
          str_data.push(i);
      }
      let t1 = performance.now();
      sandbox.get_input(str_data[400]);
      let t2 = performance.now();
      sandbox.display(t2-t1);
  `);
  */
  /*
 vm.run(`
      const {performance}  = require("perf_hooks");
      var obj = {framework:"electron",web:"worker",numbers:5000,color:"blue"};
      let t1 = performance.now();
      sandbox.get_input(obj["web"]);
      let t2 = performance.now();
      sandbox.display(t2-t1);
  `);
  */
 
  
}
catch(err){
  console.log(err);
}