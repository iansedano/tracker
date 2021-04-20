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
  // TODO add entry type handler functions...
  addEntry(row) {
    const entry = row.reduce((data, entry, i) => {
      const header = this.headerArray[i]
      const type = this.fields[header].type
      if (type === "list") {
        if (entry === "" || entry === 0) {
          data[header] = []
        } else {
          data[header] = entry.toString().split(",")
        }
      } else if (type == "average") {
        if (entry === "" || entry === 0) {
          data[header] = [0,0]
        } else {
          const avgArray = entry.toString().split(",")
          if (avgArray.length !== 2) throw "invalid array"
          data[header] = avgArray
          
        }
      } else {
        data[header] = entry
      }
      return data
    }, {})

    this.entries.unshift(entry)
  }

  checkIfHaveTodayEntry(){
    const index = getIndexComponentsFromDate(new Date())
    Logger.log("newly created index")
    Logger.log(index)
    Logger.log(this)
    // TODO below needs to be adapted to find the dates...
    // Though I feel like this needs to go at the beginning
    // Within spreadsheet.js or straight after, as part of the initialization
    // I am also thinking that the index needs to be an actual index...not
    // something somwhere between an index and a date
    if (this.entries.hasOwnProperty(index)) {
      return true
    } else return false
  }

  createBlankEntryForToday(){
    const indexComponents = getIndexComponentsFromDate(new Date())
    const row = this.headerArray.map(header => {
      if (indexComponents.hasOwnProperty(header)){
        return indexComponents[header]
      } else return ""
    })
    this.addEntry(row)
    addRowToSheet(row)
  }

  serialize() {
    return JSON.stringify(this)
  }
}


function getInitData(){
  const values = getData().values
  const headers = values.shift();
  const types = values.shift();

  const data = new Data(headers, types);

  const lastEntry = values.pop()

  data.addEntry(lastEntry)

  let lastWeek;
  if (data.checkIfHaveTodayEntry()) {
    Logger.log("Already have date for today!")
    lastWeek = values.slice(-6, values.length)
  } else {
    Logger.log("no entry for today, creating")
    data.createBlankEntryForToday()
    lastWeek = values.slice(-5, values.length)
  }
  

  lastWeek.forEach( row => data.addEntry(row) )

  const output = data.serialize()
  return output
}