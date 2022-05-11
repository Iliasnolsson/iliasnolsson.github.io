
class PalletVariableListItem {

    constructor({title, value, formatter, valueForInputValue, valueDidChange}) {
        this.title = title
        this.value = value
        if (formatter === undefined || formatter === null) {
            this.formatter = formatter = e => e
        } else {
            this.formatter = formatter
        }
        if (valueForInputValue === undefined || valueForInputValue === null) {
            this.valueForInputValue = e => e
        } else {
            this.valueForInputValue = valueForInputValue
        }
        this.valueDidChange = valueDidChange
    } 

}