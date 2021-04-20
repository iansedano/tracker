function update(payload) {
    // const gasPayload = {
    //     name: payload.nasme,
    //     value: result,
    //     index: payload.index,
    //     colIndex: data.fields[payload.name].index
    // }
    console.log("payload recieved", payload)
    Logger.log(payload)
    
    const { sheet, values } = getData();

    const headers = values.shift()
    const headerMetadata = values.shift()

    const {year, month, day} = getIndexComponentsFromIndex(payload.index)

    console.log(year, month, day)

    try {
    values.forEach((row, i) => {
        const rowYear = row[0]
        const rowMonth = row[1]
        const rowDay = row[2]

        console.log(rowYear,rowMonth,rowDay)

        if (
            rowYear == year
            && rowMonth == month
            && rowDay == day
        ) {
            sheet
                .getRange(i + 3, payload.colIndex + 1)
                .setValue(`${payload.value}`)
            throw "found!"
        }
    })
    } catch (e){
        if (e === "found!") return payload.value
        throw e
    }

    return 1
}



