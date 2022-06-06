
class ScannerProjectPreviewManager {

    constructor(previewDiv) {
        var reusablesDiv = document.getElementById("reusables")
        var scannerPreview = reusablesDiv.querySelector(".scanner-preview").cloneNode(true)
        previewDiv.appendChild(scannerPreview)
    }


}