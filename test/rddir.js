const { app, BrowserWindow, dialog, remote } = require('electron')
const path = require('path');

var fs = require('fs'); // Load the File System to execute our common tasks (CRUD)

const { performance,PerformanceObserver } = require('perf_hooks');
let t0,t1,t2,t3,t4=0,t5=0,t6=0,t7=0;

//list dir async
function ls(dirname){
    t0 = performance.now();
    fs.readdir(dirname, (err, files) => {
      if(err) throw err
      files.forEach(entry => { 
       //console.log (entry)
      })
      t1 = performance.now();
      console.log('async read:'+(t1-t0)+' ms');
     })
  }

function lssync(dirname){
    t2 = performance.now();
    let stat = fs.lstatSync(dirname)
    if (stat.isDirectory()){
        let files = fs.readdirSync(dirname);
        files.forEach( file => {
        //console.log(file);
        })
        t3 = performance.now();
        console.log('sync read:'+(t3-t2)+' ms');
    }
}

ls('./testdir');
lssync('./testdir');

function ls_rec(dirname,flag){
    let temp;
    let stat = fs.lstatSync(dirname)
    if(stat.isDirectory()){
    fs.readdir(dirname, (err, files) => {
      if(err) throw err
      files.forEach(entry => { 
       ls_rec(path.join(dirname,entry),0);
      })
      t5 += performance.now();
      if(flag==1){
        console.log('async recursive read:'+(t5-t4)+' ms');
      }
      
     })
   }
  }

function lssync_rec(dirname,flag){
    
    let stat = fs.lstatSync(dirname)
    if (stat.isDirectory()){
        let files = fs.readdirSync(dirname);
        files.forEach( file => {
            lssync_rec(path.join(dirname,file),0);
        })
        t7 = performance.now();
        if(flag==1){
            console.log('sync recursive read:'+(t7-t6)+' ms');
        }
    }
}

t4 = performance.now();
ls_rec('./testdir',1);


t6 = performance.now();
lssync_rec('./testdir',1);


app.whenReady();

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

