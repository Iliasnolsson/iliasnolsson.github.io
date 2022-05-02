
class PalletVariableList {

    constructor() {
        this.listDiv = document.getElementById("configurator-variables-list")
        document.addEventListener("click", ev => {
            if (ev.path.filter(x => x.className == "configurator-variables-list-item").length == 0) {
                this._stopEditing()
            } 
        })
        document.addEventListener("keyup", event => {
            if (event.key === 'Enter') {
                this._stopEditing()
            }
        });
    }

    setItems(newItems) {
        this.items = newItems.filter(x => typeof x !== "string" || x instanceof String)
        this.listDiv.innerHTML = ""
        for (let index = 0; index < newItems.length; index++) {
            var newItem = newItems[index]
            if (typeof newItem === 'string' || newItem instanceof String) {
                var titleLabel = document.createElement("label")
                titleLabel.innerHTML = newItem
                titleLabel.className = "configurator-variables-list-title"
                this.listDiv.appendChild(titleLabel)
            } else {
                this._addItem(newItem)
            }
        }
    }

    _stopEditing() {
        var spans = this.listDiv.querySelectorAll("span")
        spans.forEach(x =>{x.contentEditable = false; x.contentEditable = true})
    }

    _addItem(item) {
        var itemDiv = document.createElement("div")
        itemDiv.className = "configurator-variables-list-item"

        var itemLabel = document.createElement("label")
        var itemSpanDiv = document.createElement("div")
        var itemSpan = document.createElement("span")

        this.listDiv.appendChild(itemDiv)
        itemDiv.appendChild(itemLabel)
        itemDiv.appendChild(itemSpanDiv)
        itemSpanDiv.appendChild(itemSpan)

        itemLabel.innerHTML = item.title
        itemSpan.contentEditable = true
        itemSpan.innerHTML = item.formatter(item.value)

        itemSpan.addEventListener("focusin", ev => {
            var index = this._indexForSpan(ev.target)
            var range, selection;
            if (window.getSelection && document.createRange) {
                selection = window.getSelection();
                range = document.createRange();
                range.selectNodeContents(ev.target);
                selection.removeAllRanges();
                selection.addRange(range);
            }
        })
      
        itemSpan.addEventListener("input", ev => {
            var index = this._indexForSpan(ev.target)
            var span = ev.target
            var item = this.items[index]

            if (span.innerHTML != null && span.innerHTML.length != 0) {
                var newValue = span.innerHTML.replace(/\<br\>/g," ").trim().replace( /[^\d\.]*/g, '');
                newValue = item.valueForInputValue(newValue)
                item.value = newValue
                item.valueDidChange(newValue)
            }
        })
        itemSpan.addEventListener("focusout", ev => {
            var index = this._indexForSpan(ev.target)
            var span = ev.target
            var item = this.items[index]

            if (span.innerHTML == null || span.innerHTML.length == 0) {
                span.innerHTML = item.formatter(item.value)
            } else {
                var newValue = span.innerHTML.replace(/\<br\>/g," ").trim().replace( /[^\d\.]*/g, '');
                newValue = item.valueForInputValue(newValue)
                item.value = newValue
                span.innerHTML = item.formatter(newValue)
                item.valueDidChange(newValue)
            }
        })
    }

    _removeItemAt(index) {

    }

    _indexForSpan(span) {
        var spans = this.listDiv.querySelectorAll("span")
        for (let index = 0; index < spans.length; index++) {
            if (spans[index] === span) {
                return index
            }
        }
    }

}