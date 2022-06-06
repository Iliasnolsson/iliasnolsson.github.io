
class VectorHomeSection {

    constructor(div, contentDiv, {landscapeId, portraitId}) {
        this.div = div
        this.contentDiv = contentDiv
        this.setSvgForId({landscapeId: landscapeId, portraitId: portraitId})
    }

    setSvgForId({landscapeId, portraitId}) {
        var reusablesDiv = document.getElementById("reusables")
        if (landscapeId != undefined) {
            var landscapeSvg = reusablesDiv.querySelector("#" + landscapeId)
            landscapeSvg.removeAttribute("id")
            this.contentDiv.appendChild(landscapeSvg)
        }
    }
    
}