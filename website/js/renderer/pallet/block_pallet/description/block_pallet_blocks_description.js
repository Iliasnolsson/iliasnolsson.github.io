
class BlockPalletBlocksDescription {

    constructor({height, numberOfBlocks, spacingFraction, customSpacingFractions = {}, customDepthFractions = {}}) {
        this.height = height
        this.numberOfBlocks = numberOfBlocks
        this.spacingFraction = spacingFraction
        this.customSpacingFractions = customSpacingFractions
        this.customDepthFractions = customDepthFractions
    }

}