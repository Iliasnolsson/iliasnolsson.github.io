
class ProjectsHomeSection {

    constructor(div, contentDiv) {
        this.div = div 
        this.contentDiv = contentDiv
        
        this.projectsContainer = contentDiv.querySelector(":scope > div:first-child")
        this.svgPrevious = contentDiv.querySelector("#previous") 
        this.svgNext = contentDiv.querySelector("#next") 

        this.svgPreviousClickListener = Listener.add({
            target: this.svgPrevious,
            eventType: "click",
            eventHandler: () => {
                var index = this.animatingToScrollOffset == undefined ? this.visibleProjectIndex() : this.visibleProjectIndexForScroll(this.animatingToScrollOffset)
                this.setVisibleProjectIndex({index: index - 1})
            }
        })
        this.svgNextClickListener = Listener.add({
            target: this.svgNext,
            eventType: "click",
            eventHandler: () => {
                var index = this.animatingToScrollOffset == undefined ? this.visibleProjectIndex() : this.visibleProjectIndexForScroll(this.animatingToScrollOffset)
                this.setVisibleProjectIndex({index: index + 1})
            }
        })
        var navigationButtonsReloadTimeoutId
        this.projectsContainer.onscroll = () => {
            if (navigationButtonsReloadTimeoutId != undefined) {
                clearTimeout(navigationButtonsReloadTimeoutId)
                navigationButtonsReloadTimeoutId = null
            }
            navigationButtonsReloadTimeoutId = setTimeout(() => {
                this._navigationButtonsReload()
            }, 30);
        }
        this._projectsReload()
        this._navigationButtonsReload()
    }

    setVisibleProjectIndex({index}) {
        var index = Math.max(0, Math.min(index, ProjectsHomeSectionProject.allCases.length - 1))
   
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var minLength = Math.min(height, width)
        var projectWidth = Math.min(minLength * 0.80, width * 0.95)
        var spacing = minLength * 0.05

        var offset = ((projectWidth / 2) + spacing) - (this.projectsContainer.clientWidth / 2)
        var newOffset = (index * (projectWidth + spacing)) + offset
        this.projectsContainer.scrollTo({left: newOffset, behavior: "smooth"})
        this.animatingToScrollOffset = newOffset
        if (this.animatingScrollTimoutId != undefined) {
            clearTimeout(this.animatingScrollTimoutId)
        }
        this.animatingScrollTimoutId = setTimeout(() => [
            this.animatingToScrollOffset = null
        ], 400) 
        this._navigationButtonsReload(index)
    }

    visibleProjectIndex() {
        return this.visibleProjectIndexForScroll(this.projectsContainer.scrollLeft)
    }

    visibleProjectIndexForScroll(scroll) {
        const height = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var minLength = Math.min(height, width)
        
        var projectWidth = Math.min(minLength * 0.80, width * 0.95)
        var spacing = minLength * 0.05

        var offset = ((projectWidth / 2) + spacing) - (this.projectsContainer.clientWidth / 2)
        var index = ((scroll - offset) / (projectWidth + spacing)) 

        return Math.round(index)
    }


    _projectsReload() {
        // Language
        var language = Language.current()

        // Clearing
        if (this.previewManagers != undefined) {
            this.previewManagers.forEach(x => x.dispose())
        }
        this.previewManagers = []
        this.projectsContainer.innerHTML = ""

        // Preparing Reusables
        var reusablesDiv = document.getElementById("reusables")
        var reusableProjectDiv = reusablesDiv.querySelector("#stage-home-projects-section-content-project").cloneNode(true)
        reusableProjectDiv.removeAttribute("id")

        for (const project of ProjectsHomeSectionProject.allCases) {
            var projectDiv = reusableProjectDiv.cloneNode(true)
            var projectLabelsContainer = projectDiv.querySelector("#labels-container")

            // Title
            var projectTitleLabel = projectLabelsContainer.querySelector(":scope > label")
            var projectTitleKey = project.getTitleKey()
            var projectTitle = projectTitleKey.translated(language)
            projectTitleLabel.innerHTML = projectTitle

            // Body
            var projectBodySpan = projectLabelsContainer.querySelector(":scope > span")
            var projectBodyKey = project.getBodyKey()
            var projectBody = projectBodyKey.translated(language)
            projectBodySpan.innerHTML = projectBody
            
            // Tag  
            var projectTagLabel = projectDiv.querySelector("#tag-label")
            var projectTag = project.getTag()
            projectTagLabel.closest("div").style.backgroundColor = projectTag.getColorHex()
            projectTagLabel.innerHTML = projectTag.getTitle().toUpperCase()

            // Preview Manager
            var previewDiv = projectDiv.querySelector(":scope > div:last-child")
            var previewManager = project.getPreviewManager(previewDiv)
            this.previewManagers.push(previewManager)
            this.projectsContainer.appendChild(projectDiv)
        }
    }

    _navigationButtonsReload(index) {
        var visibleIndex = index ?? this.visibleProjectIndex()
        if (visibleIndex == 0) {
            this.svgPrevious.classList.add("hidden")
        } else {
            this.svgPrevious.classList.remove("hidden")
        }
        if (visibleIndex == ProjectsHomeSectionProject.allCases.length - 1) {
            this.svgNext.classList.add("hidden")
        } else {
            this.svgNext.classList.remove("hidden")
        }
    }

    //#region Delegate
    dispose() {
        this.svgNextClickListener.dispose()
        this.svgPreviousClickListener.dispose()
        this.svgNextClickListener = null
        this.svgPreviousClickListener = null
    }
    //#endregion

}