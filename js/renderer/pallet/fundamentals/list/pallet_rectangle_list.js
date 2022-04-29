
class PalletRectangleList {

    //#region Styling
    // Corner Radius
    get cornerRadius() {return this._cornerRadius}
    set cornerRadius(newValue) {
        this._cornerRadius = newValue
        this._cornerRadiusNeedsReload()
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
        this._layoutNeedsApply()
    } 
    
    // Height >0
    get height() {return this._height;}
    set height(newValue) {
        this._height = newValue;
        this._layoutNeedsApply()
    }
    //#endregion

    // NumberOfRectangles >0
    get numberOfRectangles() {return this._numberOfRectangles}
    set numberOfRectangles(newValue) {
        if (newValue == this._numberOfRectangles) return;
        this._numberOfRectangles = Math.max(0, newValue);
        this._rectanglesNeedsReload()
        this._layoutNeedsReload()
    }
    
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
        this.object.name = "List"

        // Undefined Prevention
        this._cornerRadius = CornerRadius.zero
        this._width = 1
        this._depth = 2
        this._height = 0.2
        this._numberOfRectangles = 3;
        this._spacingFraction = 0.1
        this._customWidthFractions = {}
        this._customSpacingFractions = {}

        this._rectangles = []
        this._isRectanglesReloadNeeded = false;
        this._isLayoutReloadNeeded = false;
        this._isLayoutApplyNeeded = false;
        this._isCornerRadiusReloadNeeded = false;
        this._isCornerRadiusApplyNeeded = false;
        
        this._rectanglesNeedsReload() 
        this._layoutNeedsReload()
    }

    render(time) {
        if (this._isRectanglesReloadNeeded) {
            this._rectanglesReload();
        }
        if (this._isLayoutReloadNeeded) {
            this._layoutReload();
        }
        if (this._isCornerRadiusReloadNeeded) {
            this._cornerRadiusReload();
        }
        if (this._isLayoutApplyNeeded) {
            this._layoutApply();
        }
        if (this._isCornerRadiusApplyNeeded) {
            this._cornerRadiusApply()
        }
        this._rectangles.forEach(x => x.render(time))
    }

    //#region Rectangles
    _rectanglesNeedsReload() {
        this._isRectanglesReloadNeeded = true
    }

    _rectanglesReload() {
        this._isRectanglesReloadNeeded = false
        var numberOfNeededRectangles = this._numberOfRectangles;
        var numberOfNeededRectanglesToAdd = numberOfNeededRectangles - this._rectangles.length
        if (numberOfNeededRectanglesToAdd != 0) {
            if (numberOfNeededRectanglesToAdd > 0) {
                for (let index = 0; index < numberOfNeededRectanglesToAdd; index++) {
                    var newRectangle = new PalletRectangle()
                    this._rectangles.push(newRectangle)
                    this.object.add(newRectangle.object)
                }
            } else {
                for (let index = 0; index < Math.abs(numberOfNeededRectanglesToAdd); index++) {
                    var rectangleToRemove = this._rectangles[0]
                    objectRemoveFromParent(rectangleToRemove)
                    _rectangles.splice(0, 1);
                    this._deleteRectangleAt(0)
                }
            }
            this._cornerRadiusNeedsReload()
        }
    }
    //#endregion

    //#region Layout
    _layoutNeedsReload() {
        this._isLayoutReloadNeeded = true;
    }

    _layoutReload() {
        this._isLayoutReloadNeeded = false;
        this._layout = new PalletRectangleListLayout({
            numberOfRectangles : this._numberOfRectangles,
            spacingFraction : this._spacingFraction,
            customWidthFractions : this._customWidthFractions,
            customSpacingFractions : this._customSpacingFractions
        })
        this._layoutNeedsApply()
    }

    _layoutNeedsApply() {
        this._isLayoutApplyNeeded = true;
    }

    _layoutApply() {
        this._isLayoutApplyNeeded = false;
        this._isCornerRadiusApplyNeeded = false;
        if (this._numberOfRectangles == 0) return;

        for (let index = 0; index < this._numberOfRectangles; index++) {
            var rectangleLayout = this._layout.rectangleLayouts[index];
            var rectangle = this._rectangles[index];
            rectangle.depth = this._depth;
            rectangle.height = this._height;
            rectangle.width = rectangleLayout.widthFraction * this._width;
            var offset = rectangleLayout.offsetFraction * this._width;
            rectangle.object.position.x = offset 
        }
    }
    //#endregion

    //#region Corner Radius
    _cornerRadiusNeedsReload() {
        this._isCornerRadiusReloadNeeded = true;
        this._cornerRadiusReload()
    }

    _cornerRadiusReload() {
        this._isCornerRadiusReloadNeeded = false;
        if (this._rectangles == null || this._rectangles.length == 0) return;

        this._rectangles.forEach(x => x.cornerRadius = CornerRadius.zero);
        var firstRectangle = this._rectangles[0]
        firstRectangle.cornerRadius = new CornerRadius({
            topLeft: this._cornerRadius.topLeft,
            topRight: 0,
            bottomLeft: this._cornerRadius.bottomLeft,
            bottomRight: 0
        });
        
        var lastRectangle = this._rectangles.slice(-1)[0] 
        var oldCornerRadius = lastRectangle.cornerRadius;
        lastRectangle.cornerRadius = new CornerRadius({
            topLeft: oldCornerRadius.topLeft,
            topRight: this._cornerRadius.topRight,
            bottomLeft: oldCornerRadius.bottomLeft,
            bottomRight: this._cornerRadius.bottomRight
        })
        this._cornerRadiusNeedsApply()
    }

    _cornerRadiusNeedsApply() {
        this._isCornerRadiusApplyNeeded = true;
    }

    _cornerRadiusApply() {
        this._isCornerRadiusApplyNeeded = false;
    }
    //#endregion
    
}