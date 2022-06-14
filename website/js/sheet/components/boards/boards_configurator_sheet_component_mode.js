
class BoardsConfiguratorSheetComponentMode {
    static AddBoard = this.c("board_component_mode_add_board")
    static ChangeValue = this.c("board_component_mode_change_value")
    static Default = this.c("board_component_mode_default")

    constructor(name) {
        this.name = name
    }

    static c(name) {
        return new BoardsConfiguratorSheetComponentMode(name)
    }

    componentPreferences() {
        var preferences = new ConfiguratorSheetComponentPreferences()
        switch (this) {
            case BoardsConfiguratorSheetComponentMode.AddBoard:
                preferences.sheetSize = ConfiguratorSheetSize.Large;
                preferences.headerVisible = false
                break;
            case BoardsConfiguratorSheetComponentMode.ChangeValue:
                preferences.sheetSize = ConfiguratorSheetSize.ExtraLarge;
                preferences.headerVisible = false
                break
            case BoardsConfiguratorSheetComponentMode.Default:
                preferences.sheetSize = ConfiguratorSheetSize.Large;
                break;
        }
        return preferences;
    }

}