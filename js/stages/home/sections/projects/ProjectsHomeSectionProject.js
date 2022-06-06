
class ProjectsHomeSectionProject {
    static Animation = this.c("animation")
    static PalletConfigurator = this.c("pallet_configurator")
    static Scanner = this.c("scanner")
    static BagConfigurator = this.c("bag_configurator")
    static CaravanController = this.c("caravan_controller")

    constructor(name) {
        this.name = name
    }

    static c(name) {
        return new ProjectsHomeSectionProject(name)
    }

    getTitleKey() {
        switch (this) {
            case ProjectsHomeSectionProject.Animation:
                return Strings.ProjectAnimation
            case ProjectsHomeSectionProject.PalletConfigurator:
                return Strings.ProjectPallet
            case ProjectsHomeSectionProject.Scanner:
                return Strings.ProjectScanner
            case ProjectsHomeSectionProject.BagConfigurator:
                return Strings.ProjectBag
            case ProjectsHomeSectionProject.CaravanController:
                return Strings.ProjectCaravan
        }
    }

    getBodyKey() {
        switch (this) {
            case ProjectsHomeSectionProject.Animation:
                return Strings.ProjectAnimationDescription
            case ProjectsHomeSectionProject.PalletConfigurator:
                return Strings.ProjectPalletDescription
            case ProjectsHomeSectionProject.Scanner:
                return Strings.ProjectScannerDescription
            case ProjectsHomeSectionProject.BagConfigurator:
                return Strings.ProjectBagDescription
            case ProjectsHomeSectionProject.CaravanController:
                return Strings.ProjectCaravanDescription
        }
    }

    getTag() {
        switch (this) {
            case ProjectsHomeSectionProject.Animation:
                return ProjectsHomeSectionProjectTag.App
            case ProjectsHomeSectionProject.PalletConfigurator:
                return ProjectsHomeSectionProjectTag.Web
            case ProjectsHomeSectionProject.Scanner:
                return ProjectsHomeSectionProjectTag.App
            case ProjectsHomeSectionProject.BagConfigurator:
                return ProjectsHomeSectionProjectTag.Web
            case ProjectsHomeSectionProject.CaravanController:
                return ProjectsHomeSectionProjectTag.App
        }
    }

    getPreviewManager(previewDiv) {
        switch (this) {
            case ProjectsHomeSectionProject.Animation:
                return new LotteProjectPreviewManager(previewDiv)
            case ProjectsHomeSectionProject.PalletConfigurator:
                return new PalletProjectPreviewManager(previewDiv)
            case ProjectsHomeSectionProject.Scanner:
                return new ScannerProjectPreviewManager(previewDiv)
            case ProjectsHomeSectionProject.BagConfigurator:
                return new BagProjectPreviewManager(previewDiv)
            case ProjectsHomeSectionProject.CaravanController:
                return new CaravanProjectPreviewManager(previewDiv)
        }
    }

    static get allCases() {
        return [
            ProjectsHomeSectionProject.Animation, 
            ProjectsHomeSectionProject.PalletConfigurator,
            ProjectsHomeSectionProject.Scanner,
            ProjectsHomeSectionProject.BagConfigurator,
            ProjectsHomeSectionProject.CaravanController
        ]
    }

}