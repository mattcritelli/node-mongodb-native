'use strict';
var test = require('./shared').assert;
var setupDatabase = require('./shared').setupDatabase;
// var f = require('util').format;
var expect = require('chai').expect;

// node_modules/.bin/mongodb-test-runner -l -e replicaset test/functional/operation_changestream_example_tests.js

describe('Changestream Examples', function() {
  before(function() {
    return setupDatabase(this.configuration);
  });

  it('has next', {
    metadata: {
      requires: {
        topology: ['replicaset']
      }
    },

    // The actual test we wish to run
    test: function(done) {
      const configuration = this.configuration;
      const client = configuration.newClient(configuration.writeConcernMax(), { poolSize: 1 });
      client.connect(function(err, client) {
        const db = client.db(configuration.db);
        const collection = db.collection('changeStreamExample1a');
        const changeStream = collection.watch();

        // Use next
        changeStream.next(function(err, next) {
          if (err) console.log(err);
          expect(err).to.equal(null);
          expect(next).to.exist;
          client.close();
          done();
        });

        // Insert something
        collection.insertOne({ a: 1 }, function(err, result) {
          if (err) return console.log(err);
          expect(err).to.equal(null);
          expect(result).to.exist;
        });
      });
    }
  });

  // it('event emitter api', {
  //   metadata: {
  //     requires: {
  //       topology: ['replicaset']
  //     }
  //   },
  //
  //   // The actual test we wish to run
  //   test: function(done) {
  //     const configuration = this.configuration;
  //     const client = configuration.newClient(configuration.writeConcernMax(), { poolSize: 1 });
  //     client.connect(function(err, client) {
  //       const db = client.db(configuration.db);
  //       const collection = db.collection('changeStreamExample1b');
  //       const changeStream = collection.watch();
  //
  //       // Use event emitter API
  //       changeStream.on('change', function(err, change) {
  //         if (err) console.log(err);
  //         expect(err).to.equal(null);
  //         expect(change).to.exist;
  //         client.close();
  //         done();
  //       });
  //
  //       // Insert something
  //       collection.insertOne({ a: 1 }, function(err, result) {
  //         if (err) return console.log(err);
  //         expect(err).to.equal(null);
  //         expect(result).to.exist;
  //       });
  //     });
  //   }
  // });

  // it('streams changestream', {
  //   metadata: {
  //     requires: {
  //       topology: ['replicaset']
  //     }
  //   },
  //
  //   // The actual test we wish to run
  //   test: function(done) {
  //     const configuration = this.configuration;
  //     const client = configuration.newClient(configuration.writeConcernMax(), { poolSize: 1 });
  //     client.connect(function(err, client) {
  //       const db = client.db(configuration.db);
  //       const collection = db.collection('changeStreamExample1c');
  //       const changeStream = collection.watch();
  //
  //       changeStream.stream({ transform: JSON.stringify }).pipe()
  //         .on('data', function(chunk) {
  //           console.log('data');
  //       })
  //
  //       // Insert something
  //       collection.insertOne({ a: 1 }, function(err, result) {
  //         if (err) return console.log(err);
  //         expect(err).to.equal(null);
  //         expect(result).to.exist;
  //       });
  //     });
  //   }
  // });

  // it('full document update', {
  //   metadata: {
  //     requires: {
  //       topology: ['replicaset']
  //     }
  //   },
  //
  //   // The actual test we wish to run
  //   test: function(done) {
  //     const configuration = this.configuration;
  //     const client = configuration.newClient(configuration.writeConcernMax(), { poolSize: 1 });
  //     client.connect(function(err, client) {
  //       const db = client.db(configuration.db);
  //       const collection = db.collection('changeStreamExample1b');
  //       const changeStream = collection.watch({ fullDocument: 'updateLookup' });
  //
  //       // Use event emitter API
  //       changeStream.on('change', function(err, change) {
  //         if (err) console.log(err);
  //         expect(err).to.equal(null);
  //         expect(change).to.exist;
  //         client.close();
  //         done();
  //       });
  //
  //       // Insert something
  //       collection.insertOne({ a: 1 }, function(err, result) {
  //         if (err) return console.log(err);
  //         expect(err).to.equal(null);
  //         expect(result).to.exist;
  //       });
  //     });
  //   }
  // });

  // it('resume token', {
  //   metadata: {
  //     requires: {
  //       topology: ['replicaset']
  //     }
  //   },
  //
  //   // The actual test we wish to run
  //   test: function(done) {
  //     const configuration = this.configuration;
  //     const client = configuration.newClient(configuration.writeConcernMax(), { poolSize: 1 });
  //     client.connect(function(err, client) {
  //       const db = client.db(configuration.db);
  //       const collection = db.collection('changeStreamExample3');
  //       const changeStream = collection.watch();
  //       let resumeToken;
  //       console.log("Have CS");
  //
  //       changeStream.hasNext(function (err, change) {
  //         if (err) return console.log(err);
  //         console.log("hasnext1")
  //         expect(err).to.equal(null);
  //         expect(change).to.exist;
  //         changeStream.next(function(err, change) {
  //           console.log("next1")
  //           if (err) return console.log(err);
  //           expect(err).to.equal(null);
  //
  //           resumeToken = change._id;
  //
  //           expect(change._id).to.exist;
  //           expect(changeStream.resumeToken).to.exist;
  //
  //           changeStream.close(function(err) {
  //             console.log("close1")
  //             if (err) return console.log(err);
  //             expect(err).to.equal(null);
  //             const newChangeStream = collection.watch({ resumeAfter: resumeToken });
  //
  //             newChangeStream.next(function(err, next) {
  //               console.log("stream2")
  //               if (err) return console.log(err);
  //               expect(err).to.equal(null);
  //               expect(next).to.exist;
  //               client.close();
  //               done();
  //             });
  //           });
  //         });
  //       });
  //     });
  //   }
  // });
});
