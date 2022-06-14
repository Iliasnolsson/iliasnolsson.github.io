
class BlockPalletBottomdeckDescription {

    constructor({height, numberOfBoards, spacingFraction, customSpacingFractions = {}, customWidthFractions = {}}) {
        this.height = height
        this.numberOfBoards = numberOfBoards
        this.spacingFraction = spacingFraction
        this.customSpacingFractions = customSpacingFractions
        this.customWidthFractions = customWidthFractions
    }

}