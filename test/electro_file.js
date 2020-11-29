const { app, BrowserWindow, dialog, remote } = require("electron");
const path = require("path");

//asynchronous calling

var fs = require("fs"); // Load the File System to execute our common tasks (CRUD)

const { performance,PerformanceObserver } = require("perf_hooks");
let t0,t1;
let maxd=0;

function fileread(){
  let max=0;
  var start = new Date();
fs.readFile("./doc.txt", "utf-8", (err, data) => {
    if(err){
        console.log("An error ocurred reading the file :" + err.message);
        return;
    }
    var end = new Date() - start;
    if(end>max){
      max=end;
    }
    // Change how to handle the file content
    //console.log("The file content is : " + data.toString());
});
console.log(max);
}

//recursively searching directory and producing max time
function readTree () {
  
 fs.lstat("./doc.txt", (err,stat) => {
  
  if (err){
    throw err;
  }
  if (stat.isDirectory()){
  var start = new Date();
  var hrstart = process.hrtime();
   fs.readdir("./node_modules", (err,files) => {
    var end = new Date() - start;
    if(end>maxd){
      maxd=end;
    }
    //console.log(end);
    var hrend = process.hrtime(hrstart);
    if (err) throw err
    files.forEach( (file) => {
     readTree(path.join(entry,file));
    // t1 = performance.now();
    }) 
   // console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
   })
  } else {
    //console.log(content);
  }
 });
 console.log('async:'+maxd);
}



function readtreesync(dirname){
  let maxd=0;
  var start = new Date();
    let stat = fs.lstatSync("/home/tapan/Downloads");
    var hrstart = process.hrtime();
    if (stat.isDirectory()){
     let files = fs.readdirSync("/home/tapan/Downloads");
     var end = new Date() - start;
     var hrend = process.hrtime(hrstart);
     if(end>maxd){
      maxd=end;
      console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
     }
     
     files.forEach( file => {
      readtreesync(path.join(dirname,file));
     })
    } else {
     //console.log (dirname)
    }
   // console.log('sync:'+maxd);
   }

function filesync(files){
/*Simple sync example*/
const fs = require("fs");
const file = files;
let max=0;
var start = new Date();
var hrstart = process.hrtime();
let data;
try {
 var end = new Date()  -start;
 var hrend = process.hrtime(hrstart);
 console.info('Execution time (hr): %ds %dms', hrend[0], hrend[1] / 1000000);
 data = fs.readFileSync(file);
 //console.log(data)
} catch (err) {
 // Here you get the errors
}
}


//fileread('doc.txt');
readTree("./node_modules");
readtreesync("/home/tapan/Downloads");
//filesync('doc.txt');

app.whenReady();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})






