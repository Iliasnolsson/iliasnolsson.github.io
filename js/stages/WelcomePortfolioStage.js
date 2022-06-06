
class WelcomePortfolioStage {

    constructor(div) {
        this.div = div
        this.container = document.getElementById("welcome-stage-container")
        var titleLabel = div.querySelector("#welcome-label")
        var subtitleLabel = div.querySelector("#about-me-label")
        this.lookButton = div.querySelector("#look-button");
        this.lookButtonWrapper = div.querySelector("#look-button-wrapper")

        this.lookButtonWrapper.style.opacity = "0"
        this.lookButtonWrapper.style.pointerEvents = "none"
        this.lookButtonClickListener = Listener.add({
            target: this.lookButton,
            eventType: "click",
            eventHandler: () => {
                this.setStageForType({
                    stageType: PortfolioStageType.Language,
                    animated: true
                })
            }
        })

        setTimeout(() => {
            this.container.style.transition = "opacity 1.8s"
            this.container.style.opacity = "1"

            setTimeout(() => {
                titleLabel.style.transition = "1.8s cubic-bezier(.2,.17,0,1.04)"
                titleLabel.style.transform = "translateY(0px)"
                setTimeout(() => {
                    subtitleLabel.style.transition = "2s cubic-bezier(.2,.17,0,1.04), opacity 3s cubic-bezier(.2,.17,0,1.04)"
                    subtitleLabel.style.transform = "translateY(-5%)"

                    setTimeout(() => {
                        subtitleLabel.style.opacity = "1"
                    }, 400)

                    setTimeout(() => {
                        this.lookButtonWrapper.style.pointerEvents = "all"
                        this.lookButtonWrapper.style.transition = "3.3s cubic-bezier(.2,.17,0,1.04)"
                        this.lookButtonWrapper.style.transform = "scale(1, 1)"
                        this.lookButtonWrapper.style.opacity = "1"
                    }, 2000);
                }, 400)
            }, 0)
        }, 700)

    }

    //#region PortfolioStage (Protocol)
    dispose() {
        this.lookButtonClickListener.dispose()
        this.lookButtonClickListener = null
    }
    //#endregion

}