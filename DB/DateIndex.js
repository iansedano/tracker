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
        let day = date.getDate()

        // if (month.toString().length === 1){
        //     month = '0' + month
        // }

        // if (day.toString().length === 1) {
        //     day = '0' + day
        // }

        return `${year}-${month}-${day}`

    } else throw "not a date!"
}

function isValidIndex(index) {
    return typeof(index) === 'string' &&
    (index.length <= 10 || index.length >= 8)
}

function getDateFromIndex(index) {

    if (isValidIndex(index)) {
        let [ year, month, day ] = index.split('-')//add map here?
        year = parseInt(year)
        month = parseInt(month) - 1
        day = parseInt(day) -1
    
        return new Date(year, month, day)
    } else throw "Invalid index!"
}

function getIndexComponentsFromIndex(index) {
    if (isValidIndex(index)) {
        const [ year, month, day ]  = index.split('-')
        return {
            year:parseInt(year),
            month:parseInt(month),
            day:parseInt(day)
        }
    } else throw "invalid index!"
}

function getIndexComponentsFromDate(date) {
    const index = getIndexFromDate(date)
    const indexComponents = getIndexComponentsFromIndex(index)
    Logger.log(indexComponents)
    return indexComponents
}