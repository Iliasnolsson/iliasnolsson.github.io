
class Portfolio {

    constructor() { 
        this.mainDiv = document.getElementById("main")
        for (let index = 0; index < PortfolioStageType.allCases.length; index++) {
            const stageType = PortfolioStageType.allCases[index];
            var stageDivId = stageType.getStageDivId()
            var stageDiv = document.getElementById(stageDivId)
            stageDiv.style.opacity = "0"
            stageDiv.style.display = "none"
        }

        var languageName = CookieManager.getCookie("language")
        if (languageName != null) {
            this.setStageForType({
                stageType: PortfolioStageType.Home,
                animated: false
                
            })
        } else {
            this.setStageForType({
                stageType: PortfolioStageType.Welcome,
                animated: false
            })
        }
    }

    setStageForType({stageType, animated}) {
        // Hide 
        if (this.stage != null) {
            this.stage.div.style.transition = animated ? "opacity 0.4s" : "opacity 0s"
            this.stage.div.style.opacity = "0"

            this.stage.setStageForType = null
            this.stage.dispose()
            this.stage = null
        }
        // Show
        var stageDivId = stageType.getStageDivId()
        var stageDiv = document.getElementById(stageDivId)
        stageDiv.remove()
        stageDiv.style.display = "block"
        this.mainDiv.appendChild(stageDiv)

        if (animated) {
            setTimeout(() => {
                stageDiv.style.transition = animated ? "opacity 0.4s" : "opacity 0s"
                stageDiv.style.opacity = "1"
            }, 500)
        } else {
            stageDiv.style.transition = animated ? "opacity 0.4s" : "opacity 0s"
            stageDiv.style.opacity = "1"
        }
        this.stage = stageType.getStage(stageDiv)
        this.stage.setStageForType = ({stageType, animated}) => this.setStageForType({stageType: stageType, animated: animated});

        // Delegate Setup 
        switch (stageType) {
            case PortfolioStageType.Welcome:
                break
            case PortfolioStageType.Language:
                this.stage.languageDidChange = newLanguage => {
                    if (newLanguage != null) {
                        CookieManager.setCookie("language", Language.Swedish.name, 14)
                    }
                }
                break
            case PortfolioStageType.Home:
                break
        }
    }

}