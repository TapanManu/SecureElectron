var worker = new Worker('worker.js');

const { performance,PerformanceObserver } = require('perf_hooks');


const files = ['file1','file2','file3','file4','file5'];
let t1 = performance.now();

worker.addEventListener('message', function(e) {
  console.log('Time async: ', e.data);
}, false);

worker.postMessage(files[4]); // Send data to our worker.