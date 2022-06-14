
class PalletRectangleGridLayout {

    // number of rectangles - int
    // spacing fraction - double 0...1
    // custom width fractions - dictionary of int : float 0...1
    // custom spacing fractions - dictionary of int : float 0...1
    constructor({ numberOfColumns, spacingFraction, customWidthFractions, customSpacingFractions }) {
        var maxCustomWidthIndex = numberOfColumns - 1 
        var customWidthFractions = Object.fromEntries(Object.entries(customWidthFractions).filter(([key]) => key <= maxCustomWidthIndex))
        var maxCustomSpacingIndex = numberOfColumns - 2
        var customSpacingFractions = Object.fromEntries(Object.entries(customSpacingFractions).filter(([key]) => key <= maxCustomSpacingIndex))

        var customWidthFractionsValues = Object.values(customWidthFractions)
        var customSpacingFractionValues = Object.values(customSpacingFractions)

        this.numberOfColumns = numberOfColumns
        this.columnLayouts = []

        if (numberOfColumns == 0) {return}

        var numberOfCustomWidths = Math.min(numberOfColumns, customWidthFractionsValues.length);
        var totalCustomWidthFraction = 0;
        for (let index = 0; index < numberOfCustomWidths; index++) {
            totalCustomWidthFraction += customWidthFractionsValues[index];
        }

        var numberOfSpacings = Math.max(0, numberOfColumns - 1);
        var numberOfCustomSpacings = Math.min(numberOfSpacings, customSpacingFractionValues.length);
        var totalCustomSpacingFraction = 0;
        for (let index = 0; index < numberOfCustomSpacings; index++) {
            totalCustomSpacingFraction += customSpacingFractionValues[index];
        }

        var totalSpacing = totalCustomSpacingFraction + (numberOfSpacings - numberOfCustomSpacings) * spacingFraction;
       
        var fractionAvailableForWidthFraction = 1 - totalSpacing - totalCustomWidthFraction;
        var numberOfNonCustomRectangle = numberOfColumns - numberOfCustomWidths;

        // Width fraction for rectangles where no custom width is specified
        var widthFraction = (fractionAvailableForWidthFraction == 0 || numberOfNonCustomRectangle == 0) ? 0 : fractionAvailableForWidthFraction / numberOfNonCustomRectangle;

        var offset = 0;
        for (let index = 0; index < numberOfColumns; index++) {
            var width = customWidthFractions[index] ?? widthFraction;
            var spacing = customSpacingFractions[index] ?? spacingFraction;
            this.columnLayouts.push(new PalletRectangleListRectangleLayout(offset, width));
            offset += width + spacing;
        }
    }

}