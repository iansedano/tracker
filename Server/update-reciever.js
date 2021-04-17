function update(payload) {
    // const gasPayload = {
    //     name: payload.name,
    //     value: result,
    //     index: payload.index,
    //     colIndex: data.fields[payload.name].index
    // }
    let sheet, values
    { sheet, values } = getData();

    const headers = values.slice(0,1)
    
    let lineToUpdate;

    values.forEach((row, i) => {
        const year = row[0]
    })
}

function getIndexFromDate(date) {
    const isDateObject = 
        date
        &&
        Object.prototype.toString.call(date) === '[object Date]'
        &&
        !isNaN(date)
    
    if (isDateObject) {
        const year = date.getFullYear()
        let month = date.getMonth() + 1
        let day = date.getDate() + 1

        if (month.toString().length === 1){
            month = '0' + month
        }

        if (day.toString().length === 1) {
            day = '0' + day
        }

        return `${year}-${month}-${day}`

    } else throw "not a date!"
}

function isValidIndex(index) {
    return typeof(index) === 'string' && index.length === 10
}

function getDateFromIndex(index) {

    if (isValidIndex(index)) {
        const dateComponents = index.split('-')
        let year, month, day
        [year, month, day] = [...dateComponents]
        year = parseInt(year)
        month = parseInt(month) - 1
        day = parseInt(day) - 1
    
        return new Date(year, month, day)
    } else throw "Invalid index!"
}