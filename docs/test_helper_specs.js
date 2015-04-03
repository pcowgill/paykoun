
var Firebase = require('firebase');
var Paykoun = require('paykoun');


var WorkerNameOne = require('./lib/workers/WorkerNameOne')();


Paykoun.createWorker('name', {
  work: function(){
    firebase.do();
  }
);

PaykounHelper.testWorker = function(workerDef, job, done) {
  //var worker = Worker1.instantiate();
  var worker = new Worker('name');

  worker.doWork(job, done);
};

result = {
  //returnedJob: func
  returnedAJob: function(){
    re
  }
}

var spy1;

describe('Test worker', function(){
  it('Should run the test', function(){
    PaykounHelper.testWorker(workerFunc, job, function(err, result){
      expect(result.returnVal()).to.eql('one');
      expect(result.returnedAJob()).to.eql('one');
      expect(spy1).to.be.called
    });
  });
})