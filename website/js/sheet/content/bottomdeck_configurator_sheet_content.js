
class BottomdeckConfiguratorSheetContent {

    constructor() {
        this.mainDiv = document.getElementById(this.getDivId())
        this.boardsComponent = new BoardsConfiguratorSheetComponent(this.mainDiv)
        this.boardsComponent.updatePreferences = animated => {
            this.updatePreferences({animated})
        }
        this.boardsComponent.updateCustomOverlaySubtitle = () => {
            this.updateCustomOverlaySubtitle()
        } 
        this.boardsComponent.getRenderer = () => {
            return this.getRenderer()
        }
        this.boardsComponent.layoutDidChange = () => {
            var renderer = this.getRenderer().pallet
            renderer.width = this.boardsComponent.layout.totalWidth
            renderer.legs = this.boardsComponent.layout.numberOfBoards
            renderer.legsSpacingFraction = this.boardsComponent.layout.spacingFraction
            renderer.legsCustomWidthFractions = this.boardsComponent.layout.customWidthFractions
            renderer.legsCustomSpacingFractions = this.boardsComponent.layout.customSpacingFractions
        }
    }

    //#region ----- Configurator Sheet Protocol -----
    /*
        Callable methods on "this":
        - updatePreferences({animated}) - will result in ConfiguratorSheet calling getPreferences()
        - updateCustomOverlaySubtitle() - will result in ConfiguratorSheet calling getCustomOverlaySubtitle() 
        - requestStage()
        - getRenderer() 
    */ 
    getDivId() {
        return "configurator-sheet-content-bottomdeck"
    }
    // Called when ConfiguratorSheet starts using this content, also called after calling updatePreferences() 
    getPreferences() {
        var preferences = ConfiguratorSheetContentPreferences.headered({
            headerTitle: "Underdel",
            headerLeftArrowVisible: true,
            headerRightArrowVisible: true,
        })
        preferences.sheetSize = ConfiguratorSheetSize.Small
        preferences.stageIndex = ConfiguratorStage.allCasesOrdered.indexOf(ConfiguratorStage.Bottomdeck)
        preferences.applyComponentPreferences(this.boardsComponent.getPreferences())
        return preferences
    }
    getCustomOverlaySubtitle() {
        return this.boardsComponent.getCustomOverlaySubtitle() 
    }
    // Called after all methods have been attached to this
    initalized() {
        this.boardsComponent.initalized()
        var pallet = this.getRenderer().pallet
        this.boardsComponent.setLayout(new BoardsConfiguratorSheetComponentLayout({
            totalWidth: pallet.width,
            numberOfBoards: pallet.legs,
            spacingFraction: pallet.legsSpacingFraction,
            customSpacingFractions: pallet.legsCustomSpacingFractions,
            customWidthFractions: pallet.legsCustomWidthFractions
        }))
    }
    // Remove all event listeners & other non weak references, Called before a new stage is set
    dispose() {
        this.boardsComponent.dispose()
        this.boardsComponent = null
        this.mainDiv.innerHTML = ""
    }
    //#endregion

}