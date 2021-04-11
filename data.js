class Data {
  constructor(headerArray, typeArray) {
    this.fields = []
    this.entries = []

    headerArray.forEach((header, i) => {
        this.fields.push({
          'header' : header,
          'type': typeArray[i]
        })
    })
    
    //this.headerArray = headerArray

    // TODO check that index is three fields...
    // TODO should I just be using a list for this?
  }

  addEntry(row) {
    const entry = this.fields.reduce((data, entry, i) => {
      data[entry.header] = row[i]
      return data
    }, {})

    this.entries.unshift(entry)
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