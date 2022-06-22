module.exports = class InMemoryDb {

  indexName = "";
  indexHolder = {};

  constructor(indexName) {
    this.indexName = indexName;
    this.indexHolder = {[this.indexName]: {}};
  }

  setIndex(key, field, index, id, keyId) {
    const obj = {key, field, index, id};
    this.fill(keyId, key, obj);
  }

  fill(keyId, key, obj) {
    if (this.indexHolder[this.indexName][keyId] === undefined) {
      this.indexHolder[this.indexName][keyId] = {key: key, objs: []};
      this.indexHolder[this.indexName][keyId].objs.push(obj);
    } else {
      this.indexHolder[this.indexName][keyId].objs.push(obj);
    }
  }


};