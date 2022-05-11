
class BoardsConfiguratorSheetComponentLayout {

    constructor({totalWidth, numberOfBoards, spacingFraction, customSpacingFractions, customWidthFractions}) {
        this.totalWidth = totalWidth
        this.numberOfBoards = numberOfBoards
        this.spacingFraction = spacingFraction
        this.customSpacingFractions = customSpacingFractions
        this.customWidthFractions = customWidthFractions
    }


    //#region Auto width fraction
    getTotalAutoWidthFraction() {
        var maxCustomWidthIndex = this.numberOfBoards - 1 
        var customWidthFractions = Object.fromEntries(Object.entries(this.customWidthFractions).filter(([key]) => key <= maxCustomWidthIndex))
        var maxCustomSpacingIndex = this.numberOfBoards - 2
        var customSpacingFractions = Object.fromEntries(Object.entries(this.customSpacingFractions).filter(([key]) => key <= maxCustomSpacingIndex))

        var customWidthFractionsValues = Object.values(customWidthFractions)
        var customSpacingFractionValues = Object.values(customSpacingFractions)

        if (this.numberOfBoards == 0) {return null}

        var numberOfCustomWidths = Math.min(this.numberOfBoards, customWidthFractionsValues.length);
        var totalCustomWidthFraction = 0;
        for (let index = 0; index < numberOfCustomWidths; index++) {
            totalCustomWidthFraction += customWidthFractionsValues[index];
        }

        var numberOfSpacings = Math.max(0, this.numberOfBoards - 1);
        var numberOfCustomSpacings = Math.min(numberOfSpacings, customSpacingFractionValues.length);
        var totalCustomSpacingFraction = 0;
        for (let index = 0; index < numberOfCustomSpacings; index++) {
            totalCustomSpacingFraction += customSpacingFractionValues[index];
        }

        var totalSpacing = totalCustomSpacingFraction + (numberOfSpacings - numberOfCustomSpacings) * this.spacingFraction;
       
        var fractionAvailableForWidthFraction = 1 - totalSpacing - totalCustomWidthFraction;
        return fractionAvailableForWidthFraction
    }

    getAutoWidth() {
        var autoWidthFraction = this.getAutoWidthFraction()
        return autoWidthFraction == null ? null : autoWidthFraction * this.totalWidth
    }

    getAutoWidthFraction() {
        var maxCustomWidthIndex = this.numberOfBoards - 1 
        var customWidthFractions = Object.fromEntries(Object.entries(this.customWidthFractions).filter(([key]) => key <= maxCustomWidthIndex))
        var maxCustomSpacingIndex = this.numberOfBoards - 2
        var customSpacingFractions = Object.fromEntries(Object.entries(this.customSpacingFractions).filter(([key]) => key <= maxCustomSpacingIndex))

        var customWidthFractionsValues = Object.values(customWidthFractions)
        var customSpacingFractionValues = Object.values(customSpacingFractions)

        if (this.numberOfBoards == 0) {return null}

        var numberOfCustomWidths = Math.min(this.numberOfBoards, customWidthFractionsValues.length);
        var totalCustomWidthFraction = 0;
        for (let index = 0; index < numberOfCustomWidths; index++) {
            totalCustomWidthFraction += customWidthFractionsValues[index];
        }

        var numberOfSpacings = Math.max(0, this.numberOfBoards - 1);
        var numberOfCustomSpacings = Math.min(numberOfSpacings, customSpacingFractionValues.length);
        var totalCustomSpacingFraction = 0;
        for (let index = 0; index < numberOfCustomSpacings; index++) {
            totalCustomSpacingFraction += customSpacingFractionValues[index];
        }

        var totalSpacing = totalCustomSpacingFraction + (numberOfSpacings - numberOfCustomSpacings) * this.spacingFraction;
       
        var fractionAvailableForWidthFraction = 1 - totalSpacing - totalCustomWidthFraction;
        var numberOfNonCustomRectangle = this.numberOfBoards - numberOfCustomWidths;

        // Width fraction for rectangles where no custom width is specified
        var widthFraction = (fractionAvailableForWidthFraction == 0 || numberOfNonCustomRectangle == 0) ? 0 : fractionAvailableForWidthFraction / numberOfNonCustomRectangle;
        return widthFraction
    }
    //#endregion

    /* 
        Will add a new board

        Returns: 
            false:
                Due to .parameter "scaleToFit" was set to true and could not fit
            true: 
                Inserted successfully

        Parameters:
        - index: index of board where the new board should be inserted before 
        - width: specify null for auto
        - spacing: can not spesify null (only if index == numberOfBoards) / (only if board is inserted at the end)
        - scaleToFit:
            true:
                will keep totalWidth: 
                boards with auto width
            false: 
                Increases totalWidth
                boards (auto or not) will keep width 
                spacings will keep width
    */ 
    insertBoard({index, width, spacing, scaleToFit}) {
        var newCustomWidthFractions = {}
        var newCustomHeightFractions = {}
        var newSpacingFraction = 0
    }


    //#region ----- Changing Board Width -----
    /* 
        Changes the width of the board at the given "index" to the given "width"

        Returns: 
            false:
                Due to .parameter "scaleToFit" was set to true and due to following reason:
                    1. Insufficient amount of boards with capability of scaling down to make space for the width increase  
                    or
                    2. Insufficient amount of boards with capability of scaling up to fill the space left empty from the width decrease 
            true:
                Due to success. Board width at .parameter "index" was changed to .parameter "width"
        
        Parameters: 
            - index: Index of the board to change width on 
            - width: The new width
            - scaleToFit: Bool
                true: 
                
                false:
                    Increase the "totalWidth" variable by the .parameter "width" & auto spacing

    */
    setBoardWidth({index, width, scaleToFit, minAutoWidth}) {
        if (scaleToFit) {
            return this.setBoardWidthByFitting({
                index: index,
                width: width,
                minAutoWidth: minAutoWidth
            })
        } else {
            return this.setBoardWidthByIncreasing({
                index: index,
                width: width
            })
        }
    }

    /* 
        Description:
            Changes the width of the board at .parameter "index" to the given "width" by attempting to fit within "totalWidth". 
            Aborts & returns false if the method was not able to fit within "totalWidth"

        Logic: (Maintains the total width by)
            var totalWidthAvailibleForAutoWidth = "totalWidth" - (The total width occupied by custom board width (excluding possible custom board width for board at .parameter "index") + the total width occupied by spacing (including spacing of board at .parameter "index"))
            var numberOfAutoBoards = customWidthFractions.count (but where custom width for .paremter "index" is removed) / (excluding possible custom board width for board at .parameter "index") 
            var futureAutoBoardWidth = (totalWidthAvailibleForAutoWidth - "width") / numberOfAutoBoards

            // Is enough width availible to adjust without changing anything other than auto width
            - if ((numberOfAutoBoards == 0 && totalWidthAvailibleForAutoWidth == "width") || (futureAutoBoardWidth >= "minAutoWidth"))
                true:
                    if (totalWidthAvailibleForAutoWidth > "width" && numberOfAutoBoards == 0) {
                        return false (2.)
                    }
                    // Senarios which makes it ok to change by doing "customWidthFractions[index] = "width" / "totalWidth"
                    // 1. TotalWidthAvailibleForWidth is exactly .paremter "width" && there are no auto boards which need any of the "TotalWidthAvailibleForWidth"
                    // 3. Width of board at .paremeter "index" is decreased but there are enough `auto` boards which can scale up to fill the "totalWidth"
                    // 4. Width of board at .parameter "index" is increased but there are enough `auto` boards which can scale down to fit within the "totalWidth" & which at the same time has a width wider or equal to .parameter "minAutoWidth" 
                    customWidthFractions[index] = "width" / "totalWidth"
                    return true
                false:
                    return false (1.)

        Parameters: 
            - index: Index of the board to change width on 
            - width: The new width
            - minAutoWidth: The minimum acceptable width for `auto` boards after change in width of board at .parameter "index"

        Returns: 
            false:
                1. Insufficient total amount of decreasable width to make space for the width increase (insufficient amount of boards with capability of scaling down to make space for the width increase)
                or
                2. Insufficient amount of boards with capability of scaling up to fill the space left empty from the width decrease 
            true:
                Due to success. Board width at .parameter "index" was changed to .parameter "width"

    */
    setBoardWidthByFitting({index, width, minAutoWidth}) {
        // Real values
        var maxCustomWidthIndex = this.numberOfBoards - 1 
        var customWidthFractions = Object.fromEntries(Object.entries(this.customWidthFractions).filter(([key]) => key <= maxCustomWidthIndex))
     
        // Current width of board at index
        var currentWidth = customWidthFractions[index] 
        var boardIsAuto = currentWidth === undefined
        currentWidth = boardIsAuto ? this.getAutoWidth() : currentWidth * this.totalWidth
        
        var totalWidthAvailibleForAutoWidth = (this.getTotalAutoWidthFraction() * this.totalWidth) + (!boardIsAuto ? currentWidth : 0)
        var numberOfAutoBoards = this.numberOfBoards - (Object.keys(customWidthFractions).concat(boardIsAuto ? [index] : []).filter((v, i, a) => a.indexOf(v) === i)).length
        var futureAutoBoardWidth = (totalWidthAvailibleForAutoWidth - width) / numberOfAutoBoards

        if ((numberOfAutoBoards == 0 && totalWidthAvailibleForAutoWidth == width) || (futureAutoBoardWidth >= minAutoWidth)) {
            if (totalWidthAvailibleForAutoWidth > width && numberOfAutoBoards == 0) {
                return false 
            }
            this.customWidthFractions[index] = width / this.totalWidth
            return true
        } 
        return false
    }

    /* 
        Description: 
            Changes the width of the board at .parameter "index" to .parameter "width" by increasing/decreasing the "totalWidth" 

        Logic:
            var boardOldFraction = customWidthFractions[index] 
            if (boardOldFraction == null) {

            }

            The increase/decrease in width of board at .parameter "index" is applied to "totalWidth"

    */ 
    setBoardWidthByIncreasing({ index, width }) {

    }
    /* 
        Returns: 
            false:
                Insufficient amount of width availible (availible width is either 0 or less than given minimum width) 
    */
    setBoardWidthToAuto({ index, minWidth }) {
        var boardAtIndexCustomValue = this.customWidthFractions[index]
        var isBoardCustom = boardAtIndexCustomValue === undefined || boardAtIndexCustomValue == null
        if (!isBoardCustom) {return}
        delete this.customWidthFractions[index]
    }
    //#endregion


    //#region Set spacing 
    setSpacing({index, spacing, scaleToFit, minAutoWidth}) {
        if (scaleToFit) {
            return this.setSpacingByFitting({index: index, spacing: spacing, minAutoWidth: minAutoWidth})
        } else {
            return this.setSpacingByIncreasing({index: index, spacing: spacing})
        }
    }

    /* 

        Logic: 
            Success means:
            customSpacingFraction[index] = "totalWidth" / spacing 

            Success is only possible if:

    */ 
    setSpacingByFitting({index, spacing, minAutoWidth}) {
        var oldCustomSpacingFraction = this.customSpacingFractions[index]
        this.customSpacingFractions[index] = spacing / this.totalWidth 

    }

    setSpacingByIncreasing({index, spacing}) {
        
    }
    //#endregion


    //#region Set total width 
    setTotalWidth({width}) {
        this.totalWidth = width
    }
    //#endregion 

}