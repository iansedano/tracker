/**
 * This class is stricly server side and should not be expected to pass any
 * functions or anything that cannot be simply serialized with JSON.stringify.
 * All functions will simply appear as 'undefined' when reaching client-side.
 */

class Data {
  constructor(headerArray, typeArray) {
    this.fields = {}
    this.entries = []

    // Keeping header metadata in two formats, one as an object (fields) for
    // intuitive dot notation referencing, and then the original header for
    // index referencing.
    headerArray.forEach((header, i) => {
        this.fields[header] = {
          type: typeArray[i],
          index: i
        }
    })
    
    this.headerArray = headerArray
    
    // TODO check that index is three fields...
  }

  /**
   * Turn a row into an entry object. This is only for server-side rendering.
   * @param {array} row 
   */
  addEntry(row) {
    const entry = row.reduce((data, entry, i) => {
      const header = this.headerArray[i]
      const type = this.fields[header].type

      if (type === "list" || type == "average") {
        data[header] = entry.toString().split(",")
        return data
      } else {
        data[header] = row[i] // is this not just entry??
        return data
      }
    }, {})

    this.entries.unshift(entry)
  }

  // Should I be keeping a global state here? No, this is server-side

  serialize() {
    return JSON.stringify(this)
  }
}


