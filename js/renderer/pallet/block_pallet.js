
class BlockPallet {


    //#region Styling (corner radius)
    get cornerRadius() {return this._cornerRadius}
    set cornerRadius(newValue) {
        this._cornerRadius = newValue
        this._topList.cornerRadius = newValue
        this._stingersList.cornerRadius = newValue
        this._blockGrid.cornerRadius = newValue;
        this._bottomList.cornerRadius = newValue;
    }
    //#endregion


    //#region Total size (depth & width)
    get depth() {return this._depth}
    set depth(newValue) {
        this._depth = newValue
        this._horizontalLayoutNeedsApply()
    }

    get width() {return this._width}
    set width(newValue) {
        this._width = newValue
        this._horizontalLayoutNeedsApply()
    }
    //#endregion

    //#region Top 
    get topHeight() {return this._topList.height}
    set topHeight(newValue) { this._topList.height = newValue}

    get topNumberOfBoards() {return this._topList.numberOfRectangles}
    set topNumberOfBoards(newValue) {this._topList.numberOfRectangles = newValue}

    get topSpacingFraction() {return this._topList.spacingFraction}
    set topSpacingFraction(newValue) {this._topList.spacingFraction = newValue}

    get topCustomSpacingFractions() {return this._topList.customSpacingFractions}
    set topCustomSpacingFractions(newValue) {this._topList.customSpacingFractions = newValue}

    get topCustomWidthFractions() {return this._topList.customWidthFractions}
    set topCustomWidthFractions(newValue) {return this._topList.customWidthFractions = newValue}
    //#endregion 

    //#region Legs 
    get legs() {return this._legs}
    set legs(newValue) {
        this._legs = newValue
        this._bottomList.numberOfRectangles = newValue
        this._blockGridColumnsNeedsReload()
    }

    get legsSpacingFraction() {return this._legsSpacingFraction}
    set legsSpacingFraction(newValue) {
        this._legsSpacingFraction = newValue;
        this._blockGrid.spacingFraction = newValue;
        this._bottomList.spacingFraction = newValue
    }

    get legsStingerHeight() {return this._legsStingerHeight}
    set legsStingerHeight(newValue) {
        this._legsStingerHeight = newValue
        this._stingersList.height = newValue
        this._verticalLayoutNeedsApply()
    }

    get legsBlockHeight() {return this._legsBlockHeight}
    set legsBlockHeight(newValue) {
        this._legsBlockHeight = newValue
        this._blockGrid.height = newValue
        this._verticalLayoutNeedsApply()
    }

    get legsBottomHeight() {return this._legsBottomBoardHeight}
    set legsBottomHeight(newValue) {
        this._legsBottomBoardHeight = newValue
        this._bottomList.height = newValue
        this._verticalLayoutNeedsApply()
    } 
    //#endregion

    //#region Legs spesifics
    get legsCustomSpacingFractions() {return this._legsCustomSpacingFractions}
    set legsCustomSpacingFractions(newValue) {
        this._legsCustomSpacingFractions = newValue
        this._blockGrid.customSpacingFractions = newValue
        this._bottomList.customSpacingFractions = newValue 
    }

    get legsCustomWidthFractions() {return this._legsCustomWidthFractions}
    set legsCustomWidthFractions(newValue) {
        this._legsCustomWidthFractions = newValue
        this._blockGrid.customWidthFractions = newValue
        this._bottomList.customWidthFractions = newValue
    }
    //#endregion

    //#region Leg blocks
    get legBlocks() {return this._legBlocks}
    set legBlocks(newValue) {
        this._legBlocks = newValue
        this._stingersList.numberOfRectangles = newValue
        this._blockGridColumnsNeedsReload()
    }

    get legsBlockSpacingFraction() {return this._legsBlockSpacingFraction}
    set legsBlockSpacingFraction(newValue) {
        this._legsBlockSpacingFraction = newValue
        this._stingersList.spacingFraction = newValue
        this._blockGridColumnsNeedsReload()
    }

    get legsBlockCustomSpacingFractions() {return this._legsBlockCustomSpacingFractions}
    set legsBlockCustomSpacingFractions(newValue) {
        this._legsBlockCustomSpacingFractions = newValue
        this._stingersList.customSpacingFractions = newValue;
        this._blockGridColumnsNeedsReload()
    }

    get legsBlockCustomDepthFractions() {return this._legsBlockCustomDepthFractions}
    set legsBlockCustomDepthFractions(newValue) {
        this._legsBlockCustomDepthFractions = newValue
        this._stingersList.customWidthFractions = newValue;
        this._blockGridColumnsNeedsReload()
    }
    //#endregion

    constructor() {
        this.object = new THREE.Group();
        this._topList = new PalletRectangleList()
        this._stingersList = new PalletRectangleList()
        this._blockGrid = new PalletRectangleGrid()
        this._bottomList = new PalletRectangleList()
        this._getRenderables().forEach(x => this.object.add(x.object))

        // Undefined Prevention
        this._isVerticalLayoutApplyNeeded = false
        this._isHorizontalLayoutApplyNeeded = false
        this._isBlockGridColumnsReloadNeeded = false

        // Default Values (is required)
        this.depth = 1200;
        this.width = 800;
        
        this.cornerRadius = CornerRadius.all(14)
        var middleLegWidthFraction = 0.18;

        // Default - Top
        this.topNumberOfBoards = 5;
        this.topHeight = 22;
        this.topSpacingFraction = 0.05;
        
        // Default - Top - Customs
        var topLFWidthFractions = 0.18;
        this.topCustomWidthFractions =
        {
            0 : topLFWidthFractions, 
            2 : middleLegWidthFraction,
            4 : topLFWidthFractions
        };
        this.topCustomSpacingFractions = {}

        // Default - Leg
        this.legs = 3;
        this.legsSpacingFraction = 0.28;
        this.legsCustomWidthFractions = {1 : middleLegWidthFraction}
        this.legsCustomSpacingFractions = {}
        
        // Default - Leg - Heights
        this.legsStingerHeight = 22;
        this.legsBlockHeight = 79;
        this.legsBottomHeight = 22;
        
        // Default - Leg - Block
        this.legBlocks = 3;
        this.legsBlockSpacingFraction = 0.32;
        this.legsBlockCustomDepthFractions = {}
        this.legsBlockCustomSpacingFractions = {}
    }

    render(time) {

        if (this._isVerticalLayoutApplyNeeded) {
            this._verticalLayoutApply()
        }
        if (this._isHorizontalLayoutApplyNeeded) {
            this._horizontalLayoutApply()
        }
        if (this._isBlockGridColumnsReloadNeeded) {
            this._blockGridColumnsReload() 
        } 
        for (const renderable of this._getRenderables()) {
            renderable.render(time)
        }
    }

    _blockGridColumnsNeedsReload()
    {
        this._isBlockGridColumnsReloadNeeded = true;
    }

    _blockGridColumnsReload()
    {
        this._isBlockGridColumnsReloadNeeded = false;
        var newColumns = []
        for (let index = 0; index < this._legs; index++) {
            newColumns.push(new PalletRectangleGridColumn({
                numberOfRows: this._legBlocks,
                spacingFraction: this._legsBlockSpacingFraction,
                customDepthFractions: this._legsBlockCustomDepthFractions,
                customSpacingFractions: this._legsBlockCustomSpacingFractions
            }))
        }
        this._blockGrid.setColumns(newColumns);
    }
    
    // Vertical Layout - The transform z of the levels, called when any change in z is needed, positioning (z) not size (height)
    // Horizontal Layout - The depth & width
    //#region Layout
    _verticalLayoutNeedsApply()
    {
        this._isVerticalLayoutApplyNeeded = true;
    }
    _verticalLayoutApply()
    {
        this._isVerticalLayoutApplyNeeded = false;
        var offsetY = this._legsBottomBoardHeight;

        this._blockGrid.object.position.y = offsetY
        offsetY += this._legsBlockHeight;
        
        this._stingersList.object.position.y = offsetY
        offsetY += this._legsStingerHeight;
        
        this._topList.object.position.y = offsetY
    }
    
    _horizontalLayoutNeedsApply()
    {
        this._isHorizontalLayoutApplyNeeded = true;
    }

    _horizontalLayoutApply()
    {
        this._isHorizontalLayoutApplyNeeded = false;
        var xTranslation = -(this.width / 2);
        var zTranslation = -(this.depth / 2);
        
        this._topList.depth = this._depth;
        this._topList.width = this._width;
        this._topList.object.position.x = xTranslation
        this._topList.object.position.z = zTranslation
        
        this._stingersList.depth = this._width;
        this._stingersList.width = this._depth
        this._stingersList.object.rotation.y = degrees_to_radians(90)
        this._stingersList.object.position.x = xTranslation
        this._stingersList.object.position.z = this._depth + zTranslation

        this._blockGrid.depth = this.depth;
        this._blockGrid.width = this.width;
        this._blockGrid.object.position.x = xTranslation
        this._blockGrid.object.position.z = zTranslation

        this._bottomList.depth = this.depth;
        this._bottomList.width = this.width;
        this._bottomList.object.position.x = xTranslation
        this._bottomList.object.position.z = zTranslation
    }
    //#endregion


    //#region Helpers
    _getRenderables() {
        return [this._topList, this._stingersList, this._blockGrid, this._bottomList]
    }
    //#endregion
    
}