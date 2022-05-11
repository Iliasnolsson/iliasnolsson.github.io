
class PalletRectangleGrid {

     //#region Styling
    // Corner Radius
    get cornerRadius() {return this._cornerRadius}
    set cornerRadius(newValue) {
        this._cornerRadius = newValue
        this._listsCornerRadiusReload()
    }
    //#endregion

    //#region Size
    // Width >0
    get width() {return this._width;}
    set width(newValue) {
        this._width = newValue;
        this._layoutNeedsApply()
    }

    // Depth >0
    get depth() {return this._depth; }
    set depth(newValue) {
        this._depth = newValue;
        this._lists.forEach(x => x.depth = newValue)
    } 
    
    // Height >0
    get height() {return this._height;}
    set height(newValue) {
        this._height = newValue;
        this._lists.forEach(x => x.height = newValue);
    }
    //#endregion

    // Spacing fraction 0...1 
    get spacingFraction() {return this._spacingFraction;}
    set spacingFraction(newValue) {
        this._spacingFraction = newValue;
        this._layoutNeedsReload();
    }

    // Dictionary of int : fraction 0...1
    get customWidthFractions() {return this._customWidthFractions}
    set customWidthFractions(newValue) {
        this._customWidthFractions = newValue
        this._layoutNeedsReload();
    }
    
    // Dictionary of int : fraction 0...1
    get customSpacingFractions() {return this._customSpacingFractions}
    set customSpacingFractions(newValue) {
        this._customSpacingFractions = newValue
        this._layoutNeedsReload()
    }

    constructor() {
        this.object = new THREE.Group();
        this.object.name = "Grid"

        // Undefined prevention
        this._cornerRadius = CornerRadius.zero
        this._width = 1
        this._depth = 2
        this._height = 0.2
        this._numberOfRectangles = 3;
        this._spacingFraction = 0.1
        this._customWidthFractions = {}
        this._customSpacingFractions = {}
        this._lists = []

        this._isLayoutReloadNeeded = false;
        this._isLayoutApplyNeeded = false;

        this._layoutNeedsReload()
    }

    render(time) {
        if (this._isLayoutReloadNeeded) {
            this._layoutReload()
        }
        if (this._isLayoutApplyNeeded) {
            this._layoutApply()
        }
        this._lists.forEach(x => x.render(time))
    }

    //#region Set Columns
    // newColumns: Array of PalletRectangleGridColumn
    setColumns(newColumns)
    {
        var numberOfColumns = this._lists.length;
        var numberOfNeededColumns = newColumns.length;
        var numberOfColumnsToAdd = numberOfNeededColumns - numberOfColumns;
        if (numberOfColumnsToAdd != 0)
        {
            if (numberOfColumnsToAdd > 0)
            {
                for (let index = 0; index < numberOfColumnsToAdd; index++) {
                    var list = new PalletRectangleList()
                    this.object.add(list.object)
                    this._lists.push(list);
                    list.height = this._height;
                }
            } else if (numberOfColumnsToAdd < 0)
            {
                for (let index = 0; index < Math.abs(numberOfColumnsToAdd); index++) {
                    var listToRemove = this._lists[0]
                    this._lists.splice(0, 1)
                    objectRemoveFromParent(listToRemove.object)
                }
            }
            this._layoutNeedsReload()
        }
        for (let index = 0; index < newColumns.length; index++) {
            const column = newColumns[index];
            var list = this._lists[index];
            list.spacingFraction = column.spacingFraction;
            list.numberOfRectangles = column.numberOfRows;
            list.customSpacingFractions = column.customSpacingFractions;
            list.customWidthFractions = column.customDepthFractions;
        }
    }
    //#endregion
    
    //#region Layout
    _layoutNeedsReload()
    {
        this._isLayoutReloadNeeded = true;
    }
    _layoutReload()
    {
        this._isLayoutReloadNeeded = false;
        this._layout = new PalletRectangleGridLayout({
            numberOfColumns : this._lists.length,
            spacingFraction : this._spacingFraction,
            customWidthFractions : this._customWidthFractions,
            customSpacingFractions : this._customSpacingFractions
        })
        this._listsCornerRadiusReload()
        this._layoutNeedsApply()
    }

    _layoutNeedsApply()
    {
        this._isLayoutApplyNeeded = true;
    }
    
    _layoutApply()
    {
        this._isLayoutApplyNeeded = false;
        for (let index = 0; index < this._lists.length; index++) {
            var list = this._lists[index];
            var columnLayout = this._layout.columnLayouts[index];

            list.height = this._height
            list.width = this._depth;
            list.depth = columnLayout.widthFraction * this._width;
            var offset = columnLayout.offsetFraction * this._width;

            list.object.rotation.y = degrees_to_radians(90);
            list.object.position.x = offset
            list.object.position.z = this._depth
        }
    }
    //#endregion
    
    _listsCornerRadiusReload()
    {
        if (this._lists == null || this._lists.length == 0) return;
        this._lists.forEach(x => x.cornerRadius = CornerRadius.zero);
        var firstRectangle = this._lists[0]
        firstRectangle.cornerRadius = new CornerRadius({
            topLeft: this.cornerRadius.topLeft,
            topRight: this.cornerRadius.bottomRight,
            bottomLeft: 0,
            bottomRight: 0
        });

        var lastRectangle = this._lists.slice(-1)[0] 
        var oldCornerRadius = lastRectangle.cornerRadius;
        lastRectangle.cornerRadius = new CornerRadius({
            topRight: oldCornerRadius.topRight,
            topLeft: oldCornerRadius.topLeft,
            bottomLeft: this._cornerRadius.topRight,
            bottomRight: this._cornerRadius.bottomLeft
        })
    }


}