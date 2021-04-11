class Data {
  constructor(headerArray, typeArray) {

    headerArray.forEach((header, i) => {
        this[header]: {
          'colIndex': i,
          'update': update[typeArray[i]]
        }
    })
    this.headerArray = headerArray

    // TODO check that index is three fields...
    // TODO should I just be using a list for this?
  }

  addEntry(row) {
    let entry = this.headerArray.reduce((data, entry, i) => {
      data[entry] = row[i]
      return data
    }, {})

    this[`${entry.year}${entry.month}${entry.day}`] = entry
  }

  // Should I be keeping a global state here?
}


// function addAsNums(x, y){
// console.log(typeof(x), typeof(y))
// x = x == '' ? 0 : parseInt(x)
// y = y == '' ? 0 : parseInt(y)
// console.log(x, y)
// return x + y;
// }