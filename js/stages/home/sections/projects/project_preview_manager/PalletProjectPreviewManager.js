
class PalletProjectPreviewManager {

    constructor(previewDiv) {
        var reusablesDiv = document.getElementById("reusables")
        var palletRenderer = reusablesDiv.querySelector(".pallet-renderer-wrapper")
        palletRenderer.remove()
        previewDiv.appendChild(palletRenderer)
    }

}