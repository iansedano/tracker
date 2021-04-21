class SheetDB {
    constructor () {
        this.file   = SpreadsheetApp.getActive()
        this.sheet  = file.getSheetByName("Tracking")
        this.range  = sheet.getDataRange()
        this.values = range.getValues()
    }

    addRow(row) {
        this.sheet.appendRow(row)
    }

    haveToday() {
        this.values.forEach
    }
}

function getData(){

    const file    = SpreadsheetApp.getActive()
    const sheet   = file.getSheetByName("Tracking")
    const range   = sheet.getDataRange()
    const values  = range.getValues()

    return {
        file    : file,
        sheet   : sheet,
        range   : range,
        values  : values
    }
}

function addRowToSheet(row){
    const file  = SpreadsheetApp.getActive()
    const sheet = file.getSheetByName("Tracking")
    sheet.appendRow(row)
}

function haveEntryForToday() {
    const { values } = getData()
}