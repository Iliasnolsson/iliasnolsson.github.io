
class BlockPalletVariableList {

    constructor({blockPallet}) {
        this.blockPallet = blockPallet
        this.variableList = new PalletVariableList()

        this.variableList.setItems([
            new PalletVariableListItem({
                title: "Width",
                value: this.blockPallet.width,
                formatter: value => value + "mm",
                valueForInputValue: newValue => Math.max(600, Math.min(newValue, 3000)),
                valueDidChange: newValue => this.blockPallet.width = newValue
            }),
            new PalletVariableListItem({
                title: "Depth",
                value: this.blockPallet.depth,
                formatter: value => value + "mm",
                valueForInputValue: newValue => Math.max(800, Math.min(newValue, 1400)),
                valueDidChange: newValue => this.blockPallet.depth = newValue
            }),
            new PalletVariableListItem({
                title: "Corner Radius",
                value: this.blockPallet.cornerRadius.topLeft,
                valueForInputValue: newValue => Math.max(0, Math.min(newValue, 30)),
                valueDidChange: newValue => this.blockPallet.cornerRadius = CornerRadius.all(newValue)
            }),
            "Top",
            new PalletVariableListItem({
                title: "Boards",
                value: this.blockPallet.topNumberOfBoards,
                valueForInputValue: newValue => Math.max(1, Math.min(newValue, 7)),
                valueDidChange: newValue => this.blockPallet.topNumberOfBoards = newValue
            }),
            new PalletVariableListItem({
                title: "Spacing",
                value: this.blockPallet.topSpacingFraction,
                formatter: value => parseInt(value * 100) + "%",
                valueForInputValue: value => Math.min(value / 100, 0.1),
                valueDidChange: newValue => this.blockPallet.topSpacingFraction = newValue
            }),
            new PalletVariableListItem({
                title: "Height",
                value: this.blockPallet.topHeight,
                formatter: value => value + "mm",
                valueForInputValue: newValue => Math.min(200, Math.max(10, newValue)),
                valueDidChange: newValue => this.blockPallet.topHeight = newValue
            }),
            "Legs",
            new PalletVariableListItem({
                title: "Boards",
                value: this.blockPallet.legs,
                valueForInputValue: value => Math.min(3, Math.max(1, value)),
                valueDidChange: newValue => this.blockPallet.legs = newValue
            }),
            new PalletVariableListItem({
                title: "Spacing",
                value: this.blockPallet.legsSpacingFraction,
                formatter: value => parseInt(value * 100) + "%",
                valueForInputValue: value => Math.max(0.14, Math.min(value / 100, 0.28)),
                valueDidChange: newValue => this.blockPallet.legsSpacingFraction = newValue
            }),
            new PalletVariableListItem({
                title: "Stingers Height",
                value: this.blockPallet.legsStingerHeight,
                formatter: value => value + "mm",
                valueForInputValue: newValue => Math.min(200, Math.max(10, newValue)),
                valueDidChange: newValue => this.blockPallet.legsStingerHeight = newValue
            }),
            new PalletVariableListItem({
                title: "Bottom Height",
                value: this.blockPallet.legsBottomHeight,
                formatter: value => value + "mm",
                valueForInputValue: newValue => Math.min(200, Math.max(10, newValue)),
                valueDidChange: newValue => this.blockPallet.legsBottomHeight = newValue
            }),
            "Leg Blocks",
            new PalletVariableListItem({
                title: "Blocks",
                value: this.blockPallet.legBlocks,
                valueForInputValue: newValue => Math.min(4, Math.max(1, newValue)),
                valueDidChange: newValue => this.blockPallet.legBlocks = newValue
            }),
            new PalletVariableListItem({
                title: "Block Height",
                value: this.blockPallet.legsBlockHeight,
                formatter: value => value + "mm",
                valueForInputValue: newValue => Math.min(200, Math.max(10, newValue)),
                valueDidChange: newValue => this.blockPallet.legsBlockHeight = newValue
            }),
            new PalletVariableListItem({
                title: "Block Spacing",
                value: this.blockPallet.legsBlockSpacingFraction,
                formatter: value => parseInt(value * 100) + "%",
                valueForInputValue: value => Math.max(0.14, Math.min(value / 100, 0.4)),
                valueDidChange: newValue => this.blockPallet.legsBlockSpacingFraction = newValue
            })
        ])
        this.variableList.valueDidChange = (index, newValue) => {
            console.log(index)
            console.log(newValue)
        }
    }

}