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

 /* Experiment : Customising sandbox - limited file and directory access
    Aim:
    The given experiment aims :
    i)  perform file read operation asynchronously in sandbox context only in limited paths allowed
   
 */
const {VM, NodeVM} = require("vm2");
const { performance} = require("perf_hooks");
const fs  = require("fs");
const path = require("path");


// By providing a file name as second argument you enable breakpoints

let ext = {
  // defining a customised sandbox 
    allowed_paths:["sandbox"],  //specifying * allows all paths
    isChildOf(child, parent){
      if (child === parent) return false
      const parentTokens = parent.toString().split(path.sep).filter(i => i.length)
      return parentTokens.every((t, i) => child.split(path.sep)[i] === t)
    },
    
    
    verify_path(pathname){
        return this.allowed_paths.includes(pathname)|| this.allowed_paths[0]==="*";
    },
    access_path(pathname,filename){
        if(this.verify_path(pathname)){
            let t1 = performance.now();
            fs.readFile(filename,(error,data)=>{
              if(error){
                console.log(error);
                return;
            }
            let t2 = performance.now();
            console.log(t2-t1);
            });
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
      builtin: ["fs", "path"],
      root: "./",
    },
  } );
try{
    vm.run(`
        const fs = require("fs");
        const path = require("path");
        let file = "sandbox/file4.txt";
        let root = file.split("/")[0];
        ext.access_path(root,file);
    `)
}
catch(err){
    console.error("Failed to execute script.", err);
}