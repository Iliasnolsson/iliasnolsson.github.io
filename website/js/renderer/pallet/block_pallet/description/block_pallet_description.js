
class BlockPalletDescription {

    constructor({depth, width, stingersHeight, topdeckDescription, bottomdeckDescription, blocksDescription}) {
        this.cornerRadius = CornerRadius.zero
        this.depth = depth
        this.width = width
       
        this.stingersHeight = stingersHeight
        this.topdeckDescription = topdeckDescription
        this.bottomdeckDescription = bottomdeckDescription
        this.blocksDescription = blocksDescription
    }

    static get eurPallet() {
        var eurBoardHeight = 22
        var eurMiddleLegWidthFraction = 0.18;
        var eurTopLFWidthFractions = 0.18;
        var eurDescription = new BlockPalletDescription({
            depth: 1200,
            width: 800,
            stingersHeight: eurBoardHeight,
            topdeckDescription: new BlockPalletTopdeckDescription({
                height: eurBoardHeight,
                numberOfBoards: 5,
                spacingFraction: 0.05,
                customWidthFractions: 
                {
                    0 : eurTopLFWidthFractions, 
                    2 : eurMiddleLegWidthFraction,
                    4 : eurTopLFWidthFractions
                },
            }),
            bottomdeckDescription: new BlockPalletBottomdeckDescription({
                height: eurBoardHeight,
                numberOfBoards: 3,
                spacingFraction: 0.28,
                customWidthFractions: 
                {
                    1: eurMiddleLegWidthFraction
                }
            }),
            blocksDescription: new BlockPalletBlocksDescription({
                height: 79,
                numberOfBlocks: 3,
                spacingFraction: 0.32
            })
        })
        eurDescription.cornerRadius = CornerRadius.all(14)
        return eurDescription
    }


    static get standardPallet() {
        var standardDescription = new BlockPalletDescription({
            depth: 1200,
            width: 800,
            stingersHeight: 17,
            topdeckDescription: new BlockPalletTopdeckDescription({
                height: 17,
                numberOfBoards: 5,
                spacingFraction: 0.09375
            }),
            bottomdeckDescription: new BlockPalletBottomdeckDescription({
                height: 17,
                numberOfBoards: 3,
                spacingFraction: 0.3125
            }),
            blocksDescription: new BlockPalletBlocksDescription({
                height: 78,
                numberOfBlocks: 3,
                spacingFraction: 0.375
            })
        })
        return standardDescription
    }


    static get strongStandardPallet() {
        var strongHeight = 20
        var strongStandardDescription = new BlockPalletDescription({
            depth: 1200,
            width: 800,
            stingersHeight: strongHeight,
            topdeckDescription: new BlockPalletTopdeckDescription({
                height: strongHeight,
                numberOfBoards: 5,
                spacingFraction: 0.07025
            }),
            bottomdeckDescription: new BlockPalletBottomdeckDescription({
                height: strongHeight,
                numberOfBoards: 3,
                spacingFraction: 0.284375
            }),
            blocksDescription: new BlockPalletBlocksDescription({
                height: 78,
                numberOfBlocks: 3,
                spacingFraction: 0.35625
            })
        })
        return strongStandardDescription
    }

}