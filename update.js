update = {};

update.index = null;

update.calc = null;

update.replace = (currentValue, newValue) => newValue;

update.replaceIfGreater = (currentValue, newValue) => {
    if (!Number.isInteger(currentValue) || !Number.isInteger(newValue)) {
        throw "One of the arguments is not a number"
    }
    return currentValue >= newValue ? currentValue : newValue
}

update.increment = (currentValue, newValue) => {
    if (!Number.isInteger(currentValue) || !Number.isInteger(newValue)) {
        throw "One of the arguments is not a number"
    }
    return currentValue + newValue
}

update.list = (currentValue, newValue) => {
    if (!(Array.isArray(currentValue))) {
        throw "currentValue not a list"
    }
    currentValue.push(newValue);
    return currentValue
}

update.average = (currentValue, newValue) => {
    if (!(Array.isArray(currentValue) && currentValue.length !== 2) {
        throw "currentValue argument invalid"
    }
    let sum = currentValue[0] + newValue
    let avg = sum / currentValue[1] + 1
    return avg
}