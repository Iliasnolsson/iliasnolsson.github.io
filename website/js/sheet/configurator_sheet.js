
class ConfiguratorSheet {

    constructor() {
        this.mainDiv = document.getElementById("configurator-sheet")

        /* ----- Header ----- */ 
        this.headerDiv = this.mainDiv.querySelector("#configurator-sheet-header")
        // Labels
        this.headerTitleLabel = this.mainDiv.querySelector("#configurator-sheet-header-title-label")
        this.headerStageLabel = this.mainDiv.querySelector("#configurator-sheet-header-stage-label")
        // Arrows
        this.headerLeftArrow = this.mainDiv.querySelector("#configurator-sheet-header-left-arrow")
        this.headerRightArrow = this.mainDiv.querySelector("#configurator-sheet-header-right-arrow")

        // Containers (holding leading & trailing buttons)
        this.headerLeadingContainer = this.mainDiv.querySelector("#configurator-sheet-header-leading-container")
        
        // Buttons
        this.headerMenuButton = this.mainDiv.querySelector("#configurator-sheet-header-menu-button")
        this.headerCollapseButton = this.mainDiv.querySelector("#configurator-sheet-header-collapse-expand-button")

        this.isCollapsed = false;
        this.size = ConfiguratorSheetSize.Default
        this.headerCollapseButton.addEventListener("click", () => {
            this.setCollapsed({collapsed: !this.isCollapsed, animated: true})
        })
        
        /* ----- Content ----- */ 
        this.contentDivContainer = this.mainDiv.querySelector("#configurator-sheet-content-container")

        var contentDivs = Array.prototype.slice.call(this.contentDivContainer.querySelectorAll(":scope > div"))
        for (const contentDiv of contentDivs) {
            this._hideContentDiv({div: contentDiv, animated: false})
        }

        this.headerRightArrow.addEventListener("click", () => {
            if (this._preferences != undefined && this._preferences != null && this._preferences.stageIndex != null) {
                if (this._preferences.stageIndex < ConfiguratorStage.allCasesOrdered.length - 1) {
                    var newStage = ConfiguratorStage.allCasesOrdered[this._preferences.stageIndex + 1]
                    this.stageIsRequested(newStage)
                }
            }
        })
        this.headerLeftArrow.addEventListener("click", () => {
            if (this._preferences != undefined && this._preferences != null && this._preferences.stageIndex != null) {
                if (this._preferences.stageIndex > 0) {
                    var newStage = ConfiguratorStage.allCasesOrdered[this._preferences.stageIndex - 1]
                    this.stageIsRequested(newStage)
                }
            }
        })
    }

    //#region Public 
    setCollapsed({collapsed, animated}) {
        if (collapsed == this.isCollapsed) return;
        this.isCollapsed = collapsed
        this._sheetHeightNeedsReload({animated: animated})

        var svg = this.headerCollapseButton.querySelector("svg")
        if (this.isCollapsed) {
            svg.classList.add("rotated")
            this.contentDivContainer.style.visibility = "hidden"
        } else {
            svg.classList.remove("rotated")
            this.contentDivContainer.style.visibility = "visible"
        }
    }

    // Where parameter "size" is of type ConfiguratorSheetSize
    setSize({size, animated}) {
        if (this.size == size) return;
        this.size = size
        this._sheetHeightNeedsReload({animated: animated})
    }

    setContent({content, animated}) {
        this._removeContent({animated: animated})
        this._setContent({content: content, animated: animated})
    } 
    // Called by "configurator.js"
    getPreferredOverlaySubstitle() {
        if (this.content != undefined && this.content != null) {
            return this.content.getCustomOverlaySubtitle()
        }
        return null
    }
    //#endregion

    
    //#region Setting/Removing Content
    _setContent({content, animated}) {
        if (content == null) return;
        this.content = content
        this.content.updatePreferences = animated => {
            this._preferencesNeedsLayout({animated})
        }
        this.content.updateCustomOverlaySubtitle = () => {
            this.preferredOverlaySubtitleChanged()
        }
        this.content.requestStage = stage => {
            this.stageIsRequested(stage)
        }
        this.content.getRenderer = () => {
            return this.rendererIsNeeded()
        }
        this.content.initalized()

        var div = this.mainDiv.querySelector("#" + content.getDivId()) 
        this._showContentDiv({div: div, animated: animated})
        this._preferencesNeedsLayout({animated: animated})
        this.preferredOverlaySubtitleChanged()
    }

    _removeContent({animated}) {
        if (this.content != null) {
            this.content.updatePreferences = null
            this.content.updateCustomOverlaySubtitle = null
            this.content.requestStage = null
            this.content.getRenderer = null

            this.content.dispose()
            var div = this.mainDiv.querySelector("#" + this.content.getDivId()) 
            this._hideContentDiv({div: div, animated: animated})
            this.content = null
        }
    }
    //#endregion
    _preferencesNeedsLayout({animated}) {
        if (this.content == null) return;
        var preferences = this.content.getPreferences()
        this._preferences = preferences

        /* ----- Header ----- */ 
        if (preferences.headerVisible) {
            if (this._headerDivInitalHeight != undefined) {
                this.headerDiv.style.height = this._headerDivInitalHeight
            }
            if (animated) {
                setTimeout(() => {
                    if (this._preferences != null && this._preferences.headerVisible) {
                        this.headerDiv.style.overflow = "visible"
                    } 
                }, 250)
            } else {
                this.headerDiv.style.overflow = "visible"
            }
        } else {
            if (this._headerDivInitalHeight == undefined) {
                var styles  = window.getComputedStyle(this.headerDiv);
                var height = styles.getPropertyValue("height");
                this._headerDivInitalHeight = height
            }
            this.headerDiv.style.transition =  animated ? "height 0.25s" : "height 0s"
            this.headerDiv.style.height = "0"
            this.headerDiv.style.overflow = "hidden"
        }
        // Title label
        if (preferences.headerTitle != null) {
            this.headerTitleLabel.innerHTML = preferences.headerTitle
        }
        // Stage label
        if (preferences.stageIndex != null) {
            this.headerStageLabel.innerHTML = (preferences.stageIndex + 1) + "/" + ConfiguratorStage.allCasesOrdered.length
        } else {
            this.headerStageLabel.style.display = "none" 
        }
        // Menu button
        if (preferences.menuButtonVisible) {
            this.headerMenuButton.style.visibility = "visible"
        } else {
            this.headerMenuButton.style.visibility = "hidden"
        }
        // Navigation Arrows
        this.headerLeftArrow.style.visibility = preferences.headerLeftArrowVisible ? "visible" : "hidden" 
        this.headerRightArrow.style.visibility = preferences.headerRightArrowVisible ? "visible" : "hidden" 

        // Leading Container
        if (this.headerLeadingContainer.children.length > 1) {
            for (var i=this.headerLeadingContainer.children.length-1;i>=0+1;i--) {
                this.headerLeadingContainer.removeChild(this.headerLeadingContainer.children[i]);
            }
        }
        for (const leadingElement of preferences.headerLeadingElements) {
            this.headerLeadingContainer.appendChild(leadingElement)
        }
        /* ----- Size ----- */ 
        this.setSize({
            size: preferences.sheetSize,
            animated: animated
        })
    }

    _sheetHeightNeedsReload({animated}) {
        var pixels = this.size.pixels
        var style = this.mainDiv.currentStyle || window.getComputedStyle(this.mainDiv);
        var paddingTop = parseInt(style.paddingTop)
        var currentHeight = this.mainDiv.clientHeight - paddingTop 
        if (this.isCollapsed) {
            pixels = this.headerCollapseButton.clientHeight + paddingTop;
        }
        if (currentHeight == pixels) return;
        if (animated) {
            if (pixels > currentHeight) {
                this.mainDiv.style.transition = "height 0.4s"
                this.mainDiv.style.transitionTimingFunction = "cubic-bezier(0.25, 1, 0.5, 1)"
            } else {
                this.mainDiv.style.transition = "height 0.7s"
                this.mainDiv.style.transitionTimingFunction = "cubic-bezier(.24,1.29,.36,.99)"
            }
        } else {
            this.mainDiv.style.transition = ""
        }
        this.mainDiv.style.height = pixels + "px"
        this.heightDidChange()
    }

    //#region Helpers
    _hideContentDiv({div, animated}) {
        div.style.display = "none"
    }

    _showContentDiv({div, animated}) {
        div.style.display = "flex"
    }
    //#endregion

}