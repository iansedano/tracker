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