const mocks = require("./MOCK_DATA");
const Indexer = require("./Indexer");
const InMemoryDb = require("./InMemoryDb");
const fs = require('fs');



const db = new InMemoryDb("users");
const indexerIns = new Indexer();
indexerIns.setDb(db);
indexerIns.index(mocks);


fs.writeFile('helloworld.json', JSON.stringify(db.indexHolder), function (err) {
  if (err) return console.log(err);
  console.log('Hello World > helloworld.json');
});

