function update(payload) {
    // const gasPayload = {
    //     name: payload.nasme,
    //     value: result,
    //     index: payload.index,
    //     colNumber: data.fields[payload.name].index,
    //     row-number: rowNumber
    // }
    console.log("payload recieved", payload)
    Logger.log(payload)

    db = new SheetDB("Tracking")

    db.update(payload["row-number"], payload.colNumber - 1, payload.value)

    return payload.value
}



