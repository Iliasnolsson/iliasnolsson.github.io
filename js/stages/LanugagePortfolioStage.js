
class LanguagePortfolioStage{

    constructor(div) {
        this.div = div
        this.swedenButton = div.querySelector("#language-sweden-button")
        this.statesButton = div.querySelector("#language-states-button")
        this.doneButtonWrapper = div.querySelector("#language-done-button-wrapper")
        this.doneButtonLabel = div.querySelector("#language-done-button-label")
        this.doneButton = div.querySelector("#done-button")

        this.swedenClickedListener = Listener.add({
            target: this.swedenButton,
            eventType: "click",
            eventHandler: () => {
                this.setLanguage(Language.Swedish)
            }
        })
        this.statesClickedListener = Listener.add({
            target: this.statesButton,
            eventType: "click",
            eventHandler: () => {
                this.setLanguage(Language.English)
            }
        })
        this.doneButtonClickedListener = Listener.add({
            target: this.doneButton,
            eventType: "click",
            eventHandler: () => {
                this.setStageForType({
                    stageType: PortfolioStageType.Home,
                    animated: true
                })
            }
        })
    }

    setLanguage(language) {
        this.swedenButton.classList.remove("selected")
        this.statesButton.classList.remove("selected")
        this.languageDidChange(language)

        switch (language) {
            case Language.Swedish:
                this.swedenButton.classList.add("selected")
                this.doneButtonLabel.innerHTML = "Färdig"
                break
            case Language.English:
                this.statesButton.classList.add("selected")
                this.doneButtonLabel.innerHTML = "Done"
                break
        }
        if (language != null) {
            this.doneButtonWrapper.classList.add("visible")
        }
    }

    //#region PortfolioStage (Protocol)
    dispose() {
        this.swedenClickedListener.dispose()
        this.statesClickedListener.dispose()
        this.swedenClickedListener = null
        this.statesClickedListener = null

    }
    //#endregion

}