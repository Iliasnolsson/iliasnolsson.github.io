class PortfolioStageType {
    static Welcome = this.c("welcome")
    static Language = this.c("language")
    static Home = this.c("home")

    constructor(name) {
        this.name = name
    }

    static c(name) {
        return new PortfolioStageType(name)
    }

    getStage(div) {
        switch (this) {
            case PortfolioStageType.Welcome:
                return new WelcomePortfolioStage(div)
            case PortfolioStageType.Language:
                return new LanguagePortfolioStage(div)
            case PortfolioStageType.Home:
                return new HomePortfolioStage(div)
        }
    }

    getStageDivId() {
        switch (this) {
            case PortfolioStageType.Welcome:
                return "stage-welcome"
            case PortfolioStageType.Language:
                return "stage-language"
            case PortfolioStageType.Home:
                return "stage-home"
        }
    }

    static get allCases() {
        return [PortfolioStageType.Welcome, PortfolioStageType.Language, PortfolioStageType.Home]
    }

}