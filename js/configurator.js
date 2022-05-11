
class Configurator {

    constructor() {
        this.renderer = new ConfiguratorRenderer()
    }

    setBlockPallet({}) {
        var blockPallet = new BlockPallet()
        this.renderer.setPallet(blockPallet)
        return blockPallet
    }

}

window.addEventListener("load", () => {
    var configurator = new Configurator()
    var blockPallet = configurator.setBlockPallet({})
    var blockVariableList = new BlockPalletVariableList({
        blockPallet: blockPallet
    })
})

