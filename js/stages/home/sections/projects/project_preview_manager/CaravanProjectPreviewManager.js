
class CaravanProjectPreviewManager {

    constructor(previewDiv) {
        var reusablesDiv = document.getElementById("reusables")
        var caravanPreview = reusablesDiv.querySelector(".caravan-preview").cloneNode(true)
        previewDiv.appendChild(caravanPreview)
    }

}