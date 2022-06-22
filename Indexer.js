const crypto = require('crypto');

module.exports = class Indexer {

  hashCode(str, algo = "SHA-256") {
    return crypto.createHash('sha1').update(str).digest('hex');
  }

  filterStr(str) {
    return str.replaceAll(",", "").replaceAll("(", "").replaceAll(")", "");
  }


  setIndex(key, field, index, id) {
    this.db.setIndex(key, field, index, id, this.hashCode(this.filterStr(key)));
  }

  * splitStrIterator(str) {

    let i = -1, character, partialString = "";

    while (true) {
      i++;

      character = str[i];

      if (character === undefined) {
        if (partialString.length > 0) yield this.filterStr(partialString);
        break;
      }


      if (["-", " "].includes(character)) {
        yield this.filterStr(partialString);
        partialString = "";
        continue;
      }

      partialString += character;

    }

  }


  index(mocks) {
    for (const mock of mocks) {
      const indexableKeys = ['desc'];

      for (const key of indexableKeys) {

        const field = mock[key];

        let index = 0;
        for (const str of this.splitStrIterator(field.toLowerCase())) {
          //   console.log(str, index);
          this.setIndex(str, key, index, mock.id);
          index++;
        }

        index = 0;


      }

    }
  }

  setDb(db) {
    this.db = db;
  }


};