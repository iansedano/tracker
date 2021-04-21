/**
 * To run as part of doGet
 * 
 */

function getInitData(){
    const db = new SheetDB("Tracking")
    
    ensureDbLastEntryIsToday(db)

    const lastWeekValues = db.getData(7)
    const headers = db.getHeaders()
    const metadata = db.getMetadata()

    const data = new Data(headers, metadata);
  
    lastWeekValues.forEach( row => data.addEntry(row) )
  
    const output = data.serialize()
    return output
  }

function ensureDbLastEntryIsToday(db){
    const values = db.getData(1)
    Logger.log(values)
    const indexToCheck = getIndexFromDate(new Date())
    console.log("index to check", indexToCheck)
    console.log("values 0 1", values[0][1])
    if (values[0][1] == indexToCheck) {
        return
    } else {
        Logger.log("Last Entry is not today! Creating...")
        const indexComponents = getIndexComponentsFromIndex(indexToCheck)
        const newRow = db.getHeaders().map((header) => {
            if (indexComponents.hasOwnProperty(header)) {
                return indexComponents[header]
            } else return ""
        })
        db.addRow(newRow)
    }
}
