class HomeSectionType {
    static Projects = this.c("projects")
    static Practice = this.c("practice")
    static Knowledge = this.c("knowledge")
    static Communication = this.c("communication")
    static Background = this.c("backgorund")

    constructor(name) {
        this.name = name
    }

    static c(name) {
        return new HomeSectionType(name)
    }

    getSection(div, contentDiv) {
        switch (this) {
            case HomeSectionType.Projects:
                return new ProjectsHomeSection(div, contentDiv)
            case HomeSectionType.Practice:
                return new TripleHomeSection(div, contentDiv, [
                    {
                        svgId: "process-design",
                        titleKey: Strings.SectionPracticeLeftTitle,
                        bodyKey: Strings.SectionPracticeLeftBody
                    },
                    {
                        svgId: "process-map",
                        titleKey: Strings.SectionPracticeCenterTitle,
                        bodyKey: Strings.SectionPracticeCenterBody
                    },
                    {
                        svgId: "process-code",
                        titleKey: Strings.SectionPracticeRightTitle,
                        bodyKey: Strings.SectionPracticeRightBody
                    }
                ])
            case HomeSectionType.Knowledge:
                return new VectorHomeSection(div, contentDiv, {landscapeId: "home-stage-knowledge"})
            case HomeSectionType.Communication:
                return new TripleHomeSection(div, contentDiv, [
                    {
                        svgId: "stage-home-daily-report",
                        titleKey: Strings.SectionCommunicationLeftTitle,
                        bodyKey: Strings.SectionCommunicationLeftBody
                    },
                    {
                        svgId: "stage-home-process-report",
                        titleKey: Strings.SectionCommunicationCenterTitle,
                        bodyKey: Strings.SectionCommunicationCenterBody
                    },
                    {
                        svgId: "home-stage-launch-report",
                        titleKey: Strings.SectionCommunicationRightTitle,
                        bodyKey: Strings.SectionCommunicationRightBody
                    }
                ])
            case HomeSectionType.Background:
                return new VectorHomeSection(div, contentDiv, {landscapeId: "home-stage-background-landscape"})
        }
    }

    getReusableContentDivClassName() {
        var tripleSectionClassName = "stage-home-triple-section"
        var vectorSectionClassName = "stage-home-vector-section"

        switch (this) {
            case HomeSectionType.Projects:
                return "stage-home-projects-section-content"
            case HomeSectionType.Practice:
                return tripleSectionClassName
            case HomeSectionType.Knowledge:
                return vectorSectionClassName
            case HomeSectionType.Communication:
                return tripleSectionClassName
            case HomeSectionType.Background:
                return vectorSectionClassName
        }
    }
    
    getTitleKey() {
        switch (this) {
            case HomeSectionType.Projects:
                return Strings.SectionProjects
            case HomeSectionType.Practice:
                return Strings.SectionPractice
            case HomeSectionType.Knowledge:
                return Strings.SectionKnowledge
            case HomeSectionType.Communication:
                return Strings.SectionCommunication
            case HomeSectionType.Background:
                return Strings.SectionBackground
        }
    }

    getBodyKey() {
        switch (this) {
            case HomeSectionType.Projects:
                return Strings.SectionProjectsDescription
            case HomeSectionType.Practice:
                return Strings.SectionPracticeDescription
            case HomeSectionType.Knowledge:
                return Strings.SectionKnowledgeDescription
            case HomeSectionType.Communication:
                return Strings.SectionCommunicationDescription
                case HomeSectionType.Background:
                    return Strings.SectionBackgroundDescription
        }
    }

    static get allCases() {
        return [HomeSectionType.Projects, HomeSectionType.Practice, HomeSectionType.Knowledge, HomeSectionType.Communication, HomeSectionType.Background]
    }

}