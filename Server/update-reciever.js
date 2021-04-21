function update(payload) {
    // const gasPayload = {
    //     name: payload.nasme,
    //     value: result,
    //     index: payload.index,
    //     colIndex: data.fields[payload.name].index,
    //     row-number: rowNumber
    // }
    console.log("payload recieved", payload)
    Logger.log(payload)

    db = new SheetDB("Tracking")

    db.update(payload.rowNumber, payload.colIndex, payload.value)

    return payload.value
}



