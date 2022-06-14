
class Configurator {

    constructor() {
        this.renderer = new ConfiguratorRenderer()
        this.sheet = new ConfiguratorSheet()

        this.sheet.heightDidChange = () => {
            this._rendererSceneBottomPaddingReload({animated: true})
        }
        this.sheet.stageIsRequested = stage => {
            this.setStage({
                stage: stage,
                animated: true
            })
        }
        this.sheet.preferredOverlaySubtitleChanged = () => {
            this._reloadOverlaySubtitle()
        }
        this.sheet.rendererIsNeeded = () => {
            return this.renderer
        }
        this._rendererSceneBottomPaddingReload({animated: false})
        this._reloadOverlaySubtitle()
    }

    //#retion Public 
    setBlockPallet({}) {
        var blockPallet = new BlockPallet()
        this.renderer.setPallet(blockPallet)
        return blockPallet
    }

    setStage({stage, animated}) {
        if (stage == this.stage) return;
        this.stage = stage
        this.sheet.setContent({
            content: stage.getSheetContent(),
            animated: animated
        })
        this.renderer.setTransformPreferences({
            preferences: stage.getRendererTransformPreferences(),
            animated: animated
        })
    }
    //#endregion

    _rendererSceneBottomPaddingReload({animated}) {
        var height = this.sheet.isCollapsed ? 0 : this.sheet.size.pixels
        this.renderer.setSceneBottomPadding({
            padding: -height * 1.3,
            animated: animated,
            duration: 1000})
    }

    _reloadOverlaySubtitle() {
        var preferredSubtitle = this.sheet.getPreferredOverlaySubstitle()
        var subtitleLabel = document.getElementById("overlay-subtitle")
        subtitleLabel.innerHTML = preferredSubtitle ?? "Konfigurator"
    }

}

window.addEventListener("load", () => {
    var configurator = new Configurator()
    configurator.setBlockPallet({})
    configurator.setStage({
        stage: ConfiguratorStage.ChooseBase,
        animated: false
    })
})

