
class ProjectsHomeSectionProjectTag {
    static App = this.c("tag_app")
    static Web = this.c("tag_web")

    constructor(name) {
        this.name = name
    }

    static c(name) {
        return new ProjectsHomeSectionProjectTag(name)
    }

    getTitle() {
        switch (this) {
            case ProjectsHomeSectionProjectTag.App:
                return "App"
            case ProjectsHomeSectionProjectTag.Web:
                return "Web"
        }
    }

    getColorHex() {
        switch (this) {
            case ProjectsHomeSectionProjectTag.App:
                return "#4894E3"
            case ProjectsHomeSectionProjectTag.Web:
                return "#E34749"
        }
    }

}