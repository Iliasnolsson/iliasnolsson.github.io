
class HomePortfolioStage {

    constructor(div) {
        this.div = div
        this.topDiv = div.querySelector("#section-top")
        this.topDownArrows = this.topDiv.querySelector("#down-arrows")
        this.topCenterContentWrapper = div.querySelector("#stage-home-center-wrapper")
        this.topCenterContentInnerWrapper = this.topCenterContentWrapper.querySelector("#stage-home-center-inner-wrapper")
        this.topCenterContent = this.topCenterContentWrapper.querySelector("#stage-home-center")
        this.topCenterImage = this.topCenterContent.querySelector("#stage-home-image")
        this.topCenterTitle = this.topCenterContent.querySelector("#stage-home-title")
        this.topCenterBody = this.topCenterContent.querySelector("#stage-home-body")
        this.sectionsContainer = this.div.querySelector("#stage-home-sections")
        this.language = CookieManager.getCookie("language")
        this._resizeCenterContent()

        var timeoutId 
        this.windowResizeListener = Listener.add({
            target: window,
            eventType: "resize",
            eventHandler: () => {
                if (timeoutId != null) {
                    clearTimeout(timeoutId)
                }
                timeoutId = setTimeout(() => {
                    this._resizeCenterContent()
                }, 600)
            }
        })

        var showDownArrowTimoutId
        var snapScrollTimoutId
        window.onscroll = () => {
            var scroll = window.scrollY
            const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
            this.topCenterContentInnerWrapper.style.opacity = 1 - (scroll / (height / 1.6))
            var scale = ((1 - ((1 - (scroll / (height / 3))))) * 0.03) + 1
            this.topCenterContentInnerWrapper.style.transform = "translateY(" + (scroll * 0.03) + "px) scale(" + scale  + ")"
            
            // Arrow Down
            if (showDownArrowTimoutId != null) {
                clearTimeout(showDownArrowTimoutId) 
                showDownArrowTimoutId = null
            } 
            if (scroll == 0) {
                showDownArrowTimoutId = setTimeout(() => {
                    this.topDownArrows.classList.remove("hidden")
                }, 800)
            } else {
                setTimeout(() => {
                    if (scroll != 0) {
                        this.topDownArrows.classList.add("hidden")
                    }
                }, 10);
            }
            // Snapping 
            if (snapScrollTimoutId != null) {
                clearTimeout(snapScrollTimoutId)
                snapScrollTimoutId = null
            }
            snapScrollTimoutId = setTimeout(() => {
                this._snapScroll()
            }, 400)
        }

        setTimeout(() => {
            this.topDiv.style.opacity = "1"
            this.topCenterImage.style.transform = "scale(1)"
            this.topCenterTitle.style.transform = "scale(1)"
            this.topCenterBody.style.transform = "scale(1)"
        }, 800);
       
        setTimeout(() => {
            window.onscroll()
        }, 160);
        this._sectionsReload()
    }

    _snapScroll() {
        var scroll = window.scrollY
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        if (scroll < (height / 7.5)) {
            if (scroll != 0) {
                window.scrollTo({top: 0, behavior: "smooth"})
            }
        } 
    } 

    _resizeCenterContent() {
        var image = this.topCenterContent.querySelector("img")
        var scale = Math.min(window.innerWidth / image.clientWidth * 0.55, window.innerHeight / image.clientHeight * 0.35)
        scale = Math.max(0.6, scale)
        this.topCenterContent.style.transform = "scale(" + scale + ")"
    }

    _sectionsReload() {
        // Language
        var language = Language.current()

        // Clearing 
        this.sectionsContainer.innerHTML = ""
        if (this.sections !== undefined) {
            this.sections.forEach(x => x.dispose())
        }
        this.sections = []

        // Preparing Reusables
        var reusablesDiv = document.getElementById("reusables")
        var sectionReusable = reusablesDiv.querySelector("#stage-home-section").cloneNode(true)
        sectionReusable.removeAttribute("id")

        for (const sectionType of HomeSectionType.allCases) {
            var sectionDiv = sectionReusable.cloneNode(true)
            var sectionContentWrapperDiv = sectionDiv.querySelector(":scope > div:last-child")
            // Content
            var sectionContentDiv = null
            var reusableClassName = sectionType.getReusableContentDivClassName()
            if (reusableClassName !== undefined && reusableClassName != null) {
                sectionContentDiv = reusablesDiv.querySelector("." + reusableClassName).cloneNode(true)
                sectionContentWrapperDiv.appendChild(sectionContentDiv)
            }

            // Labels
            var labelsDiv = sectionDiv.querySelector(":scope > div:first-child") 

            // Title
            var titleLabel = labelsDiv.querySelector(":scope > label")
            var titleKey = sectionType.getTitleKey()
            var title = titleKey == null ? "" : titleKey.translated(language)
            titleLabel.innerHTML = title

            // Body
            var bodySpan = labelsDiv.querySelector(":scope > span")
            var bodyKey = sectionType.getBodyKey()
            var body = bodyKey == null ? "" : bodyKey.translated(language)
            bodySpan.innerHTML = body

            this.sectionsContainer.appendChild(sectionDiv)
            this.sections.push(sectionType.getSection(sectionDiv, sectionContentDiv))
        }
    }

    //#region PortfolioStage (Protocol)
    dispose() {
        this.windowResizeListener.dispose()
        this.windowResizeListener = null
    }
    //#endregion

}