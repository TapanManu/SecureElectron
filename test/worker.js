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

