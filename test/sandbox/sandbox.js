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


const { VM } = require('vm2');
const { performance,PerformanceObserver } = require("perf_hooks");

let t;
const sandbox = {
  get_input(data) {
    return 'input:' + data;
  },
  display(data) {
    console.log('Data:', data);
    t = performance.now();
  }
}

const vm = new VM({ sandbox });

let t1 = performance.now();

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
vm.run(`
    function fun(){
        return "hello world";
    }

    display(fun());
`);
console.log(t-t1);