'use strict';

var paykounPath = '../../lib/paykoun';


var rewire = require('rewire'); // rewiring library

var PaykounContext = rewire( '../../lib/context');

var chai = require('chai'); // assertion library
var expect = chai.expect;
var should = chai.should;
var sinon = require('sinon');
var util = require('util');
var sinonChai = require("sinon-chai");
var MockMgr = require('./mock/ikue');
chai.use(sinonChai);

var Paykoun = rewire(paykounPath);

var WorkQueueMgr = require('ikue').WorkQueueMgr;

describe('Paykoun', function(){
  var queueMgr;

  beforeEach(function(){
    queueMgr = new MockMgr();

    Paykoun.__set__("PaykounContext", PaykounContext);
  })

  describe('PaykounContext', function(){
    
    var threadLoad;
    var threadEval;

    beforeEach(function(){
      threadLoad = sinon.stub().yields();
      threadEval = sinon.spy();

      PaykounContext.__set__('Threads', {
        createPool: sinon.stub().returns({
          load: threadLoad,
          eval: threadEval
        })
      })
    });

    it('Should create context correctly', function(){
      var context = Paykoun.createContext(queueMgr);
      expect(context.registerWorker).to.exist;
    });

    it('Running a context should create work queues', function(done){
      var context = Paykoun.createContext(queueMgr);
      expect(context.registerWorker).to.exist;

      var triggers = ['event5', 'event4', 'event3'];
      var setWorkQueueSpy = sinon.spy(function(queue){
        queue.triggers = triggers;
        this.workQueue = queue;
      });

      context.registerWorker({
        name: "Worker1",
        setWorkQueue: setWorkQueueSpy
      });

      context.run();

      queueMgr.on('ready', function(){
        expect(queueMgr.queues.length).to.eql(1);
        
        var queue1 = queueMgr.queues[0];

        expect(queue1.name).to.eql("Worker1");
        expect(threadLoad).to.have.been.called
        expect(threadEval).to.have.been.called

        done();
      });

    });


    it('Later test', function(done){
      var context = Paykoun.createContext(queueMgr);
      expect(context.registerWorker).to.exist;

      var triggers = ['event5', 'event4', 'event3'];
      var setWorkQueueSpy = sinon.spy(function(queue){
        queue.triggers = triggers;
        this.workQueue = queue;
      });

      context.registerWorker({
        name: "Worker1",
        setWorkQueue: setWorkQueueSpy
      });

      context.registerWorker({
        name: "Worker2",
        setWorkQueue: setWorkQueueSpy
      });

      context.run();

      queueMgr.on('ready', function(){

        done();
      });

    });


  });
});