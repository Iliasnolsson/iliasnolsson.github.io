

var chooseBaseListItemIndexSelected = 0

class ChooseBaseConfiguratorSheetContent {

    constructor() {
        var mainDiv = document.getElementById(this.getDivId());
        this.listDiv = mainDiv.querySelector("div")
        
        this.listItems = [
            {
                title: "Standard",
                description: BlockPalletDescription.standardPallet,
                svgId: "standard-pallet-svg"
            },
            {
                title: "Strong Standard",
                description: BlockPalletDescription.strongStandardPallet,
                svgId: "strong-standard-pallet-svg"
            },
            {
                title: "EUR",
                description: BlockPalletDescription.eurPallet,
                svgId: "eur-pallet-svg"
            }
        ];
        this._listReload()
    }

    _listReload() {
        this.listDiv.innerHTML = "";
        for (let index = 0; index < this.listItems.length; index++) {
            var listItem = this.listItems[index]
            var button = document.createElement("button")
            this.listDiv.appendChild(button)
            var svgDiv = document.createElement("div")
            button.appendChild(svgDiv)
            if (listItem.svgId != undefined && listItem.svgId != null) {
                var svgElement = document.getElementById(listItem.svgId)
                svgDiv.innerHTML = svgElement.outerHTML
            }
            var label = document.createElement("label")
            label.innerHTML = listItem.title
            button.appendChild(label)

            button.addEventListener("click", ev => {
                var index = this._indexForButton(ev.target)
                if (index != chooseBaseListItemIndexSelected) {
                    chooseBaseListItemIndexSelected = index
                    var renderer = this.getRenderer()
                    var item = this.listItems[index]
                    renderer.pallet.copyDescription(item.description)
                    this._listReloadForSelected()
                }
            })
        }
        this._listReloadForSelected()
    }

    _listReloadForSelected() {
        var buttons = Array.from(this.listDiv.querySelectorAll("button"))
        for (let index = 0; index < buttons.length; index++) {
            var button = buttons[index]
            if (index == chooseBaseListItemIndexSelected) {
                button.classList.add("selected")
            } else {
                button.classList.remove("selected")
            }
        }
    }

    _indexForButton(button) {
        var buttons = Array.from(this.listDiv.querySelectorAll("button"))
        return buttons.indexOf(button)
    }
 
    // S----- Configurator Sheet Protocol -----S
    /*
        Callable methods on "this":
        - updatePreferences{animated}) - will result in ConfiguratorSheet calling getPreferences()
        - updateCustomOverlaySubtitle() - will result in ConfiguratorSheet calling getCustomOverlaySubtitle() 
        - requestStage()
        - getRenderer() 
    */ 
    getDivId() {
        return "configurator-sheet-content-choosebase"
    }
    // Called when ConfiguratorSheet starts using this content, also called after calling updatePreferences() 
    getPreferences() {
        var preferences = ConfiguratorSheetContentPreferences.headered({
            headerTitle: "Välj Grund",
            headerLeftArrowVisible: false,
            headerRightArrowVisible: true,
        })
        preferences.menuButtonVisible = false
        preferences.headerVisible = true
        preferences.sheetSize = ConfiguratorSheetSize.ExtraLarge
        preferences.stageIndex = ConfiguratorStage.allCasesOrdered.indexOf(ConfiguratorStage.ChooseBase)
        return preferences
    }
    getCustomOverlaySubtitle() {
        return null
    }
    // Called after all methods have been attached to this
    initalized() {
        
    }
    // Remove all event listeners & other non weak references, Called before a new stage is set
    dispose() {
    }
    // E----- Configurator Sheet Protocol -----E

}