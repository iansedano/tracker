/**
 * To run as part of doGet
 * 
 */

 function getInitData(){
    const db = new SheetDB("Tracking")
    
    if (checkIfSheetEmpty(db)) createTodayEntry(db)
    if (!checkLastEntryIsToday(db)) createTodayEntry(db)

    const lastWeekValues = db.getData(7)
    const headers = db.getHeaders()
    const metadata = db.getMetadata()

    const data = new Data(headers, metadata);
  
    lastWeekValues.forEach( row => data.addEntry(row) )
  
    const output = data.serialize()
    return output
  }

function checkLastEntryIsToday(db){
    const values = db.getData(1)
    Logger.log(values)
    const indexToCheck = getIndexFromDate(new Date())
    console.log("index to check", indexToCheck)
    console.log("values 0 1", values[0][1])
    if (values[0][1] == indexToCheck) {
        return true
    } else {
        Logger.log("Last Entry is not today! Creating...")
        return false
    }
}

function createTodayEntry(db){
  const todayIndex = getIndexFromDate(new Date())
  const indexComponents = getIndexComponentsFromIndex(todayIndex)
  const newRow = db.getHeaders().map((header) => {
      if (indexComponents.hasOwnProperty(header)) {
          return indexComponents[header]
      } else return ""
  })
  newRow.splice(0,2) // to remove the utility row and index fields
  db.addRow(newRow)
}

function checkIfSheetEmpty(db) {
  if (db._dataRows === 0) return true
}