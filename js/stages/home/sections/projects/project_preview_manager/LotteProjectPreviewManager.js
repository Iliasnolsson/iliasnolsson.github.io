
class LotteProjectPreviewManager {

    constructor(previewDiv) {
        var reusablesDiv = document.getElementById("reusables")
        var lottePreview = reusablesDiv.querySelector(".lotte-preview").cloneNode(true)
        previewDiv.appendChild(lottePreview)
    }

}