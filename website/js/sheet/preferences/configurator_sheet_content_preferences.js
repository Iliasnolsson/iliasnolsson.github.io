
class ConfiguratorSheetContentPreferences {

    constructor({headerVisible, headerTitle, headerLeftArrowVisible, headerRightArrowVisible, sheetSize}) {
        this.headerVisible = headerVisible
        this.headerTitle = headerTitle
        this.headerLeftArrowVisible = headerLeftArrowVisible
        this.headerRightArrowVisible = headerRightArrowVisible
        this.headerLeadingElements = []
        this.sheetSize = sheetSize
        this.menuButtonVisible = true
        this.stageIndex = null
    }

    // Sheet gets a header with given title & possibly right and left navigation arrows
    static headered({headerTitle, headerLeftArrowVisible = true, headerRightArrowVisible = true, sheetSize = ConfiguratorSheetSize.Default}) {
        return new ConfiguratorSheetContentPreferences({
            headerVisible: true,
            headerTitle: headerTitle,
            headerLeftArrowVisible: headerLeftArrowVisible,
            headerRightArrowVisible: headerRightArrowVisible,
            sheetSize: sheetSize
        })
    }

    // No header, content takes the whole area of the sheet
    static content({sheetSize = ConfiguratorSheetSize.Default})  {
        return new ConfiguratorSheetContentPreferences({
            headerVisible: false,
            headerTitle: null,
            headerLeftArrowVisible: null,
            headerRightArrowVisible: null,
            sheetSize: sheetSize
        })
    }

    applyComponentPreferences(preferences) {
        if (preferences == null) return
        if (preferences.headerVisible != null) {
            this.headerVisible = preferences.headerVisible
        }
        if (preferences.headerLeadingElements != null) {
            this.headerLeadingElements = this.headerLeadingElements.concat(preferences.headerLeadingElements)
        }
        if (preferences.sheetSize != null) {
            this.sheetSize = preferences.sheetSize
        }
    }
    
}