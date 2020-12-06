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

 /* Experiment : Customising Sandbox to permit only allowed hosts
    Aim:
    The given experiment aims :
    i)  Modifying the sandbox to direct url parsing only for allowed hosts
   
 */
const {VM, NodeVM} = require("vm2");
const { performance,PerformanceObserver } = require("perf_hooks");




let ext = {
    // defining a customised sandbox 
    allowed_hosts:["stackoverflow.com"],  //specifying * allows all hosts
    verify_host(hostname){
        return this.allowed_hosts.includes(hostname)|| this.allowed_hosts[0]==="*";
    },
    access_host(hostname,request,url){
        if(this.verify_host(hostname)){
            let t1 = performance.now();
            let q = request.parse(url,true);
            let t2 = performance.now();
            console.log(t2-t1);
        }
        else{
            console.log("access denied");
        }
    }   
};
const vm = new NodeVM( {
    console: "inherit",
    // pass our declared ext variable to the sandbox
    sandbox: { ext },
    require: {
      external: true,
      builtin: ["url","perf_hooks"],
      root: "./",
    },
  } );
try{
    //defining whether it is part of allowed hosts
    vm.run(`
        const request = require("url");
        const {performance} = require("perf_hooks");
        const url="https://stackoverflow.com/questions/38811259/how-to-access-a-url-using-node-js";
        const host="github.com";
        try{
            ext.access_host(host,request,url);
        }
        catch(err){
            console.log(err);
        }
    `);
    //performance of URL parse returned 3.28 ms
}
catch(err){
    console.error("Failed to execute script.", err);
}