class Header {
    constructor(headerArray) {
        this.config = headerArray.reduce((o, key, i) =>{
            { ...o, [key]:{'index': i} }
        }, {})
    }

    function createEntry(row) {
        return headers.reduce((data, entry, i) => {
          data[entry] = row[i]
          return data
        }, {})
      } 
}


function getHeaderProperties() {
    const props = {
      "indices": {},
      "replace": {
        "do": (currentValue, newValue) => newValue,
        "fields": ["weight", "max-push-ups", "max-pull-ups", "waist", "belly"]
      },
      "replaceIfGreater": {
        "do": (currentValue, newValue) => {
          if (!Number.isInteger(currentValue) || !Number.isInteger(newValue)){
            throw "One of the arguments is not a number"
          }
          return currentValue >= newValue ? currentValue : newValue
        }
      },
      "increment": {
        "do": (currentValue, newValue) => {
          if (!Number.isInteger(currentValue) || !Number.isInteger(newValue)){
            throw "One of the arguments is not a number"
          }
          return currentValue + newValue
        }
      },
      "list": {
        "do": (currentValue, newValue) => {
          if (!(Array.isArray(currentValue)) {
            throw "currentValue not a list"
          }
          currentValue.push(newValue);
          return currentValue
        }
      },
      "average": {
        "do": (currentValue, newValue) => {
          if (!(Array.isArray(currentValue) && currentValue.length !== 2) {
            throw "currentValue argument invalid"
          }
          let sum = currentValue[0] + newValue
          let avg = sum / currentValue[1] + 1
          return avg
        }
      }
    }
  
    props.average.fields = ["mood"]
    props.increment.fields = []
    props.list.fields = ["push-ups", "pull-ups", "squats", "bridges", "notes"]
    props.indices.fields = ["year", "month", "day"]
    props.replace.fields = ["weight", "max-push-ups", "max-pull-ups", "waist", "belly"]
    props.replaceIfGreater.fields = ["steps"]
  
    return props
}

// function addAsNums(x, y){
// console.log(typeof(x), typeof(y))
// x = x == '' ? 0 : parseInt(x)
// y = y == '' ? 0 : parseInt(y)
// console.log(x, y)
// return x + y;
// }