
class TripleHomeSection {

    // columns == [{svgId, titleKey, bodyKey}]
    constructor(div, contentDiv, columns) {
        this.div = div
        this.contentDiv = contentDiv
        this.columnsScroller = this.contentDiv.querySelector(":scope > div:first-child")
        this.columnsGrid = this.columnsScroller.querySelector(":scope > div")
        this.arrowsDiv = contentDiv.querySelector(":scope > div:last-child").querySelector(":scope > div")
        this.svgPrevious = this.arrowsDiv.querySelector("#previous") 
        this.svgNext = this.arrowsDiv.querySelector("#next")
        
        this.svgPreviousClickListener = Listener.add({
            target: this.svgPrevious,
            eventType: "click",
            eventHandler: () => {
                var index = this._getVisibleColumnIndex()
                this._setVisibleColumnIndex({index: index - 1})
            }
        })
        this.svgNextClickListener = Listener.add({
            target: this.svgNext,
            eventType: "click",
            eventHandler: () => {
                var index = this._getVisibleColumnIndex()
                this._setVisibleColumnIndex({index: index + 1})
            }
        })
        
        this.columnsScrollerTimeoutId = ""
        this.columnsScrollerScrollListener = Listener.add({
            target: this.columnsScroller,
            eventType: "scroll",
            eventHandler: () => {
                if (this.columnsScrollerTimeoutId != undefined) {
                    clearTimeout(this.columnsScrollerTimeoutId)
                }
                this.columnsScrollerTimeoutId = setTimeout(() => {
                    this.columnsScrollerTimeoutId = null
                    this._reloadArrowButtons({index: null})
                }, 400)
            }
        })
        this.setColumns(columns)
        this._reloadArrowButtons({index: 0})
    }

    setColumns(columns) {
        if (columns == undefined) return;
        var language = Language.current()

        var reusablesDiv = document.getElementById("reusables")
        var columnDivs = Array.from(this.columnsGrid.querySelectorAll(":scope > div"))
        for (let index = 0; index < columns.length; index++) {
            const column = columns[index];
            if (columnDivs.length > index) {
                var columnDiv = columnDivs[index]
                
                // Svg
                var columnDivVectorWrapper = columnDiv.querySelector(":scope > div:first-child").querySelector(":scope > div")
                columnDivVectorWrapper.innerHTML = ""
                if (column.svgId != undefined && column.svgId.length > 0) {
                    var svg = reusablesDiv.querySelector("#" + column.svgId)
                    if (svg != undefined) {
                        svg = svg.cloneNode(true)
                        svg.removeAttribute("id")
                        columnDivVectorWrapper.appendChild(svg)
                    }
                }
                // Labels
                var columnDivLabelsWrapper = columnDiv.querySelector(":scope > div:last-child").querySelector(":scope > div")
                var columnDivTitleLabel = columnDivLabelsWrapper.querySelector(":scope > label")
                columnDivTitleLabel.innerHTML = column.titleKey.translated(language)
                var columnDivBodySpan = columnDivLabelsWrapper.querySelector(":scope > p")
                columnDivBodySpan.innerHTML = column.bodyKey.translated(language)
            }
        }
    }

    _getVisibleColumnIndex() {
        const width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * 0.95;
        return Math.round((this.columnsScroller.scrollLeft ?? 0) / width)
    }

    _setVisibleColumnIndex({index}) {
        const width = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) * 0.95;
        var index = Math.max(0, Math.min(index, 2))
        this.columnsScroller.scrollTo({left: index * width, behavior: "smooth"})
        this._reloadArrowButtons({index: index})
    }

    _reloadArrowButtons({index}) {
        var i = index != undefined ? index : this._getVisibleColumnIndex()

        if (i == 0) {
            this.svgPrevious.classList.add("fully-hidden")
        } else {
            this.svgPrevious.classList.remove("fully-hidden")
        } 
        if (i == 2) {
            this.svgNext.classList.add("fully-hidden")
        } else {
            this.svgNext.classList.remove("fully-hidden")
        }
    }

    //#region Delegate
    dispose() {
        this.svgNextClickListener.dispose()
        this.svgNextClickListener = null
        this.svgPreviousClickListener.dispose()
        this.svgPreviousClickListener = null
        this.columnsScrollerScrollListener.dispose()
        this.columnsScrollerScrollListener = null
    }
    //#endregion
    
}