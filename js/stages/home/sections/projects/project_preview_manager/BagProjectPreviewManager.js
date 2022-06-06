
class BagProjectPreviewManager {
    
    constructor(previewDiv) {
        var reusablesDiv = document.getElementById("reusables")
        var scannerPreview = reusablesDiv.querySelector(".bag-preview").cloneNode(true)
        previewDiv.appendChild(scannerPreview)
    }

}