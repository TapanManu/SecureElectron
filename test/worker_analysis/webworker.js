const { performance,PerformanceObserver } = require("perf_hooks");
self.addEventListener("message", function(e) {
    let t2 = performance.now();
    console.log(e.data.func);
    self.postMessage(t2);
  }, false);

