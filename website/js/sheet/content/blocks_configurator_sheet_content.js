
class BlocksConfiguratorSheetContent {

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
            renderer.depth = this.boardsComponent.layout.totalWidth
            renderer.legBlocks = this.boardsComponent.layout.numberOfBoards
            renderer.legsBlockSpacingFraction = this.boardsComponent.layout.spacingFraction
            renderer.legsBlockCustomDepthFractions = this.boardsComponent.layout.customWidthFractions
            renderer.legsBlockCustomSpacingFractions = this.boardsComponent.layout.customSpacingFractions
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
        return "configurator-sheet-content-blocks"
    }
    // Called when ConfiguratorSheet starts using this content, also called after calling updatePreferences() 
    getPreferences() {
        var preferences = ConfiguratorSheetContentPreferences.headered({
            headerTitle: "Block",
            headerLeftArrowVisible: true,
            headerRightArrowVisible: true,
        })
        preferences.sheetSize = ConfiguratorSheetSize.Small
        preferences.stageIndex = ConfiguratorStage.allCasesOrdered.indexOf(ConfiguratorStage.Blocks)
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
            totalWidth: pallet.depth,
            numberOfBoards: pallet.legBlocks,
            spacingFraction: pallet.legsBlockSpacingFraction,
            customSpacingFractions: pallet.legsBlockCustomSpacingFractions,
            customWidthFractions: pallet.legsBlockCustomDepthFractions
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