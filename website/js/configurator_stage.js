
class ConfiguratorStage {
    static ChooseBase = new ConfiguratorStage("choose_base")
    static Topdeck = new ConfiguratorStage("topdeck")
    static Bottomdeck = new ConfiguratorStage("bottomdeck")
    static Blocks = new ConfiguratorStage("blocks")

    constructor(name) {
        this.name = name
    }

    // Can be null
    getSheetContent() {
        switch (this) {
            case ConfiguratorStage.ChooseBase:
                return new ChooseBaseConfiguratorSheetContent()
            case ConfiguratorStage.Topdeck:
                return new TopdeckConfiguratorSheetContent()
            case ConfiguratorStage.Bottomdeck:
                return new BottomdeckConfiguratorSheetContent()
            case ConfiguratorStage.Blocks: 
                return new BlocksConfiguratorSheetContent()
        }
        return null;
    }

    getRendererTransformPreferences() {
        switch (this) {
            case ConfiguratorStage.ChooseBase:
                var preferences = TransformConfiguratorRendererPreferences.unrestricted()
                preferences.rotation = new RotationConfiguratorRendererPreferences({
                    x: 0.38,
                    y: 0.59,
                    maintain: false
                })
                return preferences
            case ConfiguratorStage.Topdeck:
                var preferences = TransformConfiguratorRendererPreferences.unrestricted()
                preferences.rotation = new RotationConfiguratorRendererPreferences({
                    x: degrees_to_radians(90),
                    y: 0,
                    maintain: true
                })
                return preferences
            case ConfiguratorStage.Bottomdeck:
                var preferences = TransformConfiguratorRendererPreferences.unrestricted()
                preferences.rotation = new RotationConfiguratorRendererPreferences({
                    x: degrees_to_radians(10),
                    y: 0,
                    maintain: true
                })
                return preferences
            case ConfiguratorStage.Blocks:
                var preferences = TransformConfiguratorRendererPreferences.unrestricted()
                preferences.rotation = new RotationConfiguratorRendererPreferences({
                    x: degrees_to_radians(10),
                    y: degrees_to_radians(-90),
                    maintain: true
                })
                return preferences
        }
        return null;
    }

    static get allCasesOrdered() {
        return [ConfiguratorStage.ChooseBase, ConfiguratorStage.Topdeck, ConfiguratorStage.Bottomdeck, ConfiguratorStage.Blocks]
    }

}