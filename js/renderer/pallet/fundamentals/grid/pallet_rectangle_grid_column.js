
class PalletRectangleGridColumn {

    //  NumberOfRows 0>
    //  SpacingFraction 0...1
    //  CustomDepthFractions Dictionary<int, float>
    //  CustomSpacingFractions Dictionary<int, float> 
    constructor({numberOfRows, spacingFraction, customDepthFractions, customSpacingFractions}) {
        this.numberOfRows = numberOfRows;
        this.spacingFraction = spacingFraction;
        this.customDepthFractions = customDepthFractions;
        this.customSpacingFractions = customSpacingFractions;
    }
    
}