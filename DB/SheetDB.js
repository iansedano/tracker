/**
 * Assumptions
 * - That this is run from a bounded script (to a spreadsheet)
 * - that data is always ordered. I.e. Last entry will be latest.
 * - that table starts at A1
 * - 1st row will be header titles
 * - 2nd row will be header metadata
 * - All data is stored as plain text,
 *   i.e. select all data, Format > Number > Plaintext
 * 
 */
class SheetDB {
    constructor (sheetName) {
        this._file          = SpreadsheetApp.getActive()
        this._sheet         = this._file.getSheetByName(sheetName)
        this._fullRange     = this._sheet.getDataRange()
        
        this._totalHeight   = this._fullRange.getHeight()
        this._dataRows      = this._totalHeight - 2
        this._totalWidth    = this._fullRange.getWidth()

        this._headerRange   = this._sheet.getRange(1, 1, 1, this._totalWidth)
        this._metadataRange = this._sheet.getRange(2, 1, 1, this._totalWidth)

        this._headers       = this._headerRange.getValues()[0]

        this._metadata      = this._metadataRange.getValues()[0]
    }

    getData(numRows) {

        if (numRows > this._dataRows) {
            numRows = this._dataRows
        }

        const startingRow = this._totalHeight - (numRows - 1)
        const dataRange = this._sheet.getRange(
            startingRow,
            1, // starting a column 1
            numRows,
            this._totalWidth
        )
        const data = dataRange.getValues().map((row, i) => {
            const rowNumber = startingRow + i
            row.unshift(this.buildIndex(row))
            row.unshift(rowNumber)
            return row
        })
        return data
    }

    buildIndex(row) {
        Logger.log("building index")
        console.log("argument passed", row)
        console.log('metadata', this._metadata)
        let indexFields = [];
        this._metadata.forEach((val, i) => {
            if (val === "index") {
                indexFields.push(row[i])
            }
        })
        console.log('index fields', indexFields)
        return indexFields.join('-')
    }

    getHeaders(){ return ["row-number", "index", ...this._headers] }
    getMetadata(){ return ["_", "_", ...this._metadata] }

    addRow(row) {
        if (this._totalWidth === row.length) {
            this.sheet.appendRow(row)
        } else throw "row not of right length"
    }

    update(row, col, value){
        this._sheet.getRange(row, col).setValue(value)
    }
    
}