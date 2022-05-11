
class ConfiguratorSheetSize {
    static Small = this.c("sheet_size_small")
    static Default = this.c("sheet_size_default")
    static Large = this.c("sheet_size_large")
    static ExtraLarge = this.c("sheet_size_extra_large")

    constructor(name) {
        this.name = name
    }

    static c(name) {
        return new ConfiguratorSheetSize(name)
    }

    get pixels() {
        switch (this) {
            case ConfiguratorSheetSize.Small:
                return 190;
            case ConfiguratorSheetSize.Default:
                return 210;
            case ConfiguratorSheetSize.Large:
                return 250;
            case ConfiguratorSheetSize.ExtraLarge:
                return 280;
        }
        return 190
    }

}