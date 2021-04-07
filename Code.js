
function test() {
  insertData({
    day:3,
    month:4,
    year:2021
  })
}

function addAsNums(x, y){
  console.log(typeof(x), typeof(y))
  x = x == '' ? 0 : parseInt(x)
  y = y == '' ? 0 : parseInt(y)
  console.log(x, y)
  return x + y;
}

function insertData(data) {
  const file    = SpreadsheetApp.getActive();
  const sheet   = file.getSheetByName('Tracking');
  const range   = sheet.getDataRange();
  const values  = range.getValues();

  const headers = values.shift();

  function rowToObject(row) {
    return headers.reduce((data, entry, i) => {
      data[entry] = row[i]
      return data
    }, {})
  } 

  const lastEntryArray = values.slice(-1)[0];
  const lastEntry = rowToObject(lastEntryArray)

  const haveEntryForDate = (
    lastEntry.day   == data.day &&
    lastEntry.month == data.month &&
    lastEntry.year  == data.year
  )

  if (haveEntryForDate){
    const updatedEntry = {...lastEntry}

    updatedEntry["push-ups"] = addAsNums(updatedEntry["push-ups"] , data["push-ups"])
    updatedEntry["pull-ups"] = addAsNums(updatedEntry["pull-ups"] , data["pull-ups"])
    updatedEntry["squats"]   = addAsNums(updatedEntry["squats"]   , data["squats"])
    updatedEntry["bridges"]  = addAsNums(updatedEntry["bridges"]  , data["bridges"])

    updatedEntry["steps"] = updatedEntry["steps"] < data["steps"] ?
      data["steps"] : updatedEntry["steps"]

    const newLastRow = [headers.map(title => updatedEntry[title])]
    const lastRowRange = sheet.getRange(values.length + 1, 1, 1, values[0].length)
    lastRowRange.setValues(newLastRow)
    return "Entry Updated"
  } else {
    const newRecordRow = headers.map(title => data[title])
    console.log("new record to append", newRecordRow)
    sheet.appendRow(newRecordRow)
  }

}

