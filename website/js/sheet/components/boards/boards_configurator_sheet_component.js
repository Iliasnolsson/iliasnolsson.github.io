
class BoardsConfiguratorSheetComponent {

    /* 
        This class calls following method on "this": 
        - layoutDidChange()
    */

    //#region Constructor 
    constructor(mainDiv) {
        this.mainDiv = mainDiv
        var resourcesDiv = document.getElementById("resources")
        this.componentDiv = resourcesDiv.querySelector(".boards-configurator-sheet-component").cloneNode(true)
        mainDiv.appendChild(this.componentDiv)

        this.add_boards_total_grid = this.componentDiv.querySelector("#boards-component-addbuttons-boards-totalwidth-grid")

        // ----- Layout - Boards Grid -----
        this.boardsGrid = this.componentDiv.querySelector("#boards-component-boards-grid")
        // ----- Layout - Total Width -----
        this.boardsTotalWidthInput = this.componentDiv.querySelector("#boards-component-boards-total-width-input")
        this.boardsTotalWidthInput.addEventListener("click", () => {
            this._beginChangingValue({
                input: this.boardsTotalWidthInput,
                animated: true
            })
        })

        // ----- Focus -----
        this.focusHeader = this.componentDiv.querySelector("#boards-component-header")
        this.focusCancelConfirmContainer = this.componentDiv.querySelector("#boards-component-cancel-confirm-container")
        this.focusCancelButton = this.focusCancelConfirmContainer.querySelector("#boards-configurator-sheet-component-cancel")
        this.focusConfirmButton = this.focusCancelConfirmContainer.querySelector("#boards-configurator-sheet-component-confirm")

        this.focusCancelButton.addEventListener("click", () => {
            this._setMode({
                mode: BoardsConfiguratorSheetComponentMode.Default,
                animated: false
            })
        })

        // > Add Boards
        this.addBoardHeaderContainer = this.componentDiv.querySelector("#boards-configurator-sheet-component-addboard-header-container")
        this.addBoardHeaderCancelButton = this.componentDiv.querySelector("#boards-component-addboard-header-cancel-button")
        this.addBoardContainer = this.componentDiv.querySelector("#boards-component-addbuttons-container")
        this.addBoardSpacingsContainer = this.componentDiv.querySelector("#boards-component-addbuttons-spacing-container")
        this.addBoardLeftHandle = this.componentDiv.querySelector("#boards-component-addbuttons-left-handle")
        this.addBoardRightHandle = this.componentDiv.querySelector("#boards-component-addbuttons-right-handle")

        this.addButton = document.createElement("button")
        var svg = document.getElementById("plus-svg").cloneNode(true)
        svg.style.transform = "scale(1.24, 1.24)"
        this.addButton.appendChild(svg)

        var buttonLabel = document.createElement("label")
        buttonLabel.innerHTML = "Bräda"
        this.addButton.appendChild(buttonLabel)

        this.addButton.addEventListener("click", () => {
            if (this.mode == BoardsConfiguratorSheetComponentMode.AddBoard) {
                this._setMode({
                    mode: BoardsConfiguratorSheetComponentMode.Default,
                    animated: true
                })
            } else {
                this._beginAddingBoard({animated: true})
            }
        })

        this.addBoardHeaderCancelButton.addEventListener("click", () => {
            if (this.mode == BoardsConfiguratorSheetComponentMode.AddBoard) {
                this._setMode({
                    mode: BoardsConfiguratorSheetComponentMode.Default,
                    animated: true
                })
            }
        })

        // > Change Values
        this.changeValueHeaderContainer = this.componentDiv.querySelector("#boards-configurator-sheet-component-valuechange-header-container")
        this.changeValueHeaderBoardAutoButton = this.componentDiv.querySelector("#boards-component-header-board-valuechange-auto")
        this.changeValueHeaderBoardCustomButton = this.componentDiv.querySelector("#boards-component-header-board-valuechange-custom")

        // > Scrolling
        this.boundingBoxObserver = new MutationObserver((entries) => {
            for (const entry of entries) {
                this._reloadScrollingForSnapOffset({animated: false})
            }
        });

        var setInitalOffset = animated => {
            var initalOffset = this._getScrollingOffsetToCenterElement({element: this.boardsTotalWidthInput, atFraction: 0.5})
            this._setScrollingContentOffset({
                offset: initalOffset,
                animated: animated
            })
        }

        setTimeout(() => {
            setInitalOffset(true)
            this.scrollingMinOffset =  this._getScrollingOffsetToCenterElement({element: this.scrollingContainer, atFraction: 0.85})
            this.scrollingMaxOffset = this._getScrollingOffsetToCenterElement({element: this.scrollingContainer, atFraction: 0.15})
        }, 0.01);

        var resize;
        window.addEventListener("resize", () => {
            clearTimeout(resize);
            resize = setTimeout(() => {
                this.scrollingMinOffset =  this._getScrollingOffsetToCenterElement({element: this.scrollingContainer, atFraction: 0.85})
                this.scrollingMaxOffset = this._getScrollingOffsetToCenterElement({element: this.scrollingContainer, atFraction: 0.15})
                if (this._scrollingSnapElement != null) {
                    this._reloadScrollingForSnapOffset({animated: true})
                } else {
                    setInitalOffset(true)
                }
            }, 200);
        }, false)

        this.scrollingMinOffset = 0
        this.scrollingContainer = this.componentDiv.querySelector("#boards-component-scrollable-container")
        this.wheelScrollListener = Listener.add({
            target: window,
            eventType: "wheel",
            eventHandler: e => {
                e.preventDefault()
                this._wheelDate = new Date()
                if (e.target.tagName != "CANVAS") {
                    var horizontalMoreThanVertical = Math.abs(e.deltaX) > Math.abs(e.deltaY)
                    var scrolling = 0
                    if (horizontalMoreThanVertical) {
                        scrolling = -e.deltaX * 0.15
                    } else {
                        scrolling = e.deltaY * 0.15 
                    }
                    var newOffset = this.contentOffset + scrolling
                    if (this._scrollingSnapTarget != null) {
                        var translationToTarget = this._scrollingSnapTarget - newOffset
                        newOffset = newOffset + translationToTarget * 0.018
                    } else {
                        newOffset = Math.min(this.scrollingMaxOffset, newOffset)
                        newOffset = Math.max(this.scrollingMinOffset, newOffset)
                    }
                    this._setScrollingContentOffset({
                        offset: newOffset,
                        animated: true
                    })
                }
            }
        })

        // > Requered Setup Methods
        this._setFocusConfirmButtonEnabled(false)
        this._setMode({
           mode: BoardsConfiguratorSheetComponentMode.Default,
           animated: false
        })

        setTimeout(() => {
            //this._beginAddingBoard({animated: true})
        }, 200)
    }
    //#endregion

    //#region Public
    setLayout(layout) {
        this.layout = layout
        this._layoutReload()
    }
    //#endregion

    //#region Layout 
    _layoutReload() {
        this.boardsGrid.innerHTML = ""
        if (this.layout == null) return;
        this._setInputText({value: this.layout.totalWidth, input: this.boardsTotalWidthInput})

        var boardButtonClonable = document.getElementById("boards-component-board-input-reusable").cloneNode(true)
        boardButtonClonable.removeAttribute("id")

        var spacingDivClonable = document.getElementById("boards-component-spacing-input-reusable").cloneNode(true)
        spacingDivClonable.removeAttribute("id")

        var endIndex = this.layout.numberOfBoards - 1
        for (let index = 0; index < this.layout.numberOfBoards; index++) {
            // Board Input
            var boardInput = boardButtonClonable.cloneNode(true)
            this.boardsGrid.appendChild(boardInput)

            boardInput.addEventListener("click", ev => {
                this._beginChangingValue({input: ev.target, animated: true})
            })

            // Board Input Value
            var boardInputValue = "Auto"
            var customWidthFraction = this.layout.customWidthFractions[index]
            if (customWidthFraction !== undefined) {
                boardInputValue = customWidthFraction * this.layout.totalWidth
            } 
            this._setInputText({value: boardInputValue, input: boardInput})

            var numberLabel = boardInput.querySelector(".board-component-board-input-number-label")
            numberLabel.innerHTML = index + 1

            // Board is not last board, therefore add spacing
            if (index != endIndex) {
                // Spacing Input
                var spacingInput = spacingDivClonable.cloneNode(true)
                this.boardsGrid.appendChild(spacingInput)

                spacingInput.addEventListener("click", ev => {
                    this._beginChangingValue({input: ev.target, animated: true})
                })

                // Spacing Input Value
                var spacingInputValue = ""
                var customSpacingFraction = this.layout.customSpacingFractions[index]
                if (customSpacingFraction !== undefined) {
                    spacingInputValue = customSpacingFraction * this.layout.totalWidth
                } else {
                    spacingInputValue = this.layout.spacingFraction * this.layout.totalWidth
                }
                
                this._setInputText({value: spacingInputValue, input: spacingInput})
            }
        }
    }
    //#endregion

    //#region Mode 
    // Only called by constructor & methods: _beginChangingValue()
    _setMode({ mode, animated }) {
        if (this.mode !== undefined && mode == this.mode) return;

        // Required to call the end methods on begun mode
        if (this.mode !== undefined) {
            switch (this.mode) {
                case BoardsConfiguratorSheetComponentMode.ChangeValue:
                    this._endChangingValue({cancelled: true})
                    break;
                case BoardsConfiguratorSheetComponentMode.AddBoard:
                    this._endAddingBoard({cancelled: true})
                    break;
            }
        }
        this.mode = mode

        switch (mode) {
            case BoardsConfiguratorSheetComponentMode.AddBoard:
                this._setFocusHidden(false)
                this.addBoardHeaderContainer.style.display = "flex"
                this.changeValueHeaderContainer.style.display = "none"
                this.addBoardContainer.style.height = "35px"
                break;
            case BoardsConfiguratorSheetComponentMode.ChangeValue:
                this._setFocusHidden(false)
                this.addBoardContainer.style.height = "0px"
                this.addBoardHeaderContainer.style.display = "none"
                this.changeValueHeaderContainer.style.display = "flex"
                break;
            case BoardsConfiguratorSheetComponentMode.Default:
                this._setFocusHidden(true)
                this._setScrollingSnapOffset({element: null})
                this.addBoardContainer.style.height = "0px"
                break;
        }
        if (this.isInitalized) {
            this.updatePreferences({ animated })
        }
    }
    //#endregion

    //#region Mode - Addboard
    _beginAddingBoard({animated}) {
        if (this.mode == BoardsConfiguratorSheetComponentMode.AddBoard) return;
        this._setMode({
            mode: BoardsConfiguratorSheetComponentMode.AddBoard,
            animated: animated
        })
        // Setup left & right add buttons
        this._addBoardLeftHandleClickListener = Listener.add({
            target: this.addBoardLeftHandle,
            eventType: "click",
            eventHandler: () => {
                this._indexChoosenForAddingBoardSession({index: -1})
            }
        })
        this._addBoardRightHandleClickListener = Listener.add({
            target: this.addBoardRightHandle,
            eventType: "click",
            eventHandler: () => {
                this._indexChoosenForAddingBoardSession({index: this.layout.numberOfBoards - 1})
            }
        })
        
        // Add "add buttons" above every spacing 
        this.addBoardSpacingsContainer.innerHTML = ""
        var handleSvgClonable = document.getElementById("board-component-addhandle-spacing-svg").cloneNode(true)
        handleSvgClonable.id = null
        var spacingInputs = this.boardsGrid.querySelectorAll(".boards-component-spacing-input")
        
        var componentDivRect = this.componentDiv.getBoundingClientRect()
        var offsetSubtractionValue = componentDivRect.left + componentDivRect.x
        for (let index = 0; index < spacingInputs.length; index++) {
            var spacingInput = spacingInputs[index]

            var spacingHandleSvg = handleSvgClonable.cloneNode(true)
            this.addBoardSpacingsContainer.appendChild(spacingHandleSvg)

            var boundingBox = spacingInput.getBoundingClientRect()
            var offset = this._getScrollingOffsetForDOMRect({rect: boundingBox, atFraction: 0.5})
            spacingHandleSvg.style.left = offset - offsetSubtractionValue
            
            spacingHandleSvg.addEventListener("click", ev => {
                var target = ev.target
                if (target.tagName != "svg") {
                    target = target.parentNode.parentNode
                }
                if (target.tagName != "svg") return;
                var svgs = Array.from(this.addBoardSpacingsContainer.querySelectorAll("svg"))
                var indexOfClicked = svgs.indexOf(target)
                if (indexOfClicked != -1) {
                    this._indexChoosenForAddingBoardSession({index: indexOfClicked})
                }
            })
        }
    }

    /* 
        Parameter "index" representing the index of the board (boardA) which should get a new board (boardB) added to the right of it (boardA)
        -1 - add new start board
        0 - add new board after the first board
    */ 
    _indexChoosenForAddingBoardSession({index}) {

    }

    // Only called by _setMode() & _beginAddingBoard() (_beginAddingBoard() only when successfull)
    _endAddingBoard({cancelled}) {
        if (this._addBoardLeftHandleClickListener == null) return;
        this.addBoardSpacingsContainer.innerHTML = ""
        this._addBoardLeftHandleClickListener.dispose()
        this._addBoardLeftHandleClickListener = null
        this._addBoardRightHandleClickListener.dispose()
        this._addBoardRightHandleClickListener = null
    }
    //#endregion

    //#region Mode - ChangeValue
    _beginChangingValue({input, animated}) {
        if (input.classList == undefined) return;
        var firstClass = input.classList[0]
        if (firstClass != "boards-component-board-input" && firstClass != "boards-component-spacing-input" && input.id != "boards-component-boards-total-width-input") {
            this._beginChangingValue({
                input: input.parentNode,
                animated: animated
            })
            return
        }
        var span = input.querySelector("span")
        if (span == null) return;
        if (this._changingValueInput !== undefined && this._changingValueInput == input) {
            this._setMode({
                mode: BoardsConfiguratorSheetComponentMode.Default,
                animated: true
            })
            return
        }
        this._endChangingValue({cancelled: true})

        // Dimming all other inputs
        var boardInputs = Array.from(this.boardsGrid.querySelectorAll(".boards-component-board-input"))
        var spacingInputs = Array.from(this.boardsGrid.querySelectorAll(".boards-component-spacing-input"))
        var inputs = boardInputs.concat(spacingInputs).concat([this.boardsTotalWidthInput])
        inputs.forEach(x => x.classList.add("dimmed"))
        input.classList.remove("dimmed")

        // Setup values
        this._changingValueInput = input 
        this._changingValueInputSpan = span
        this._changingValueInputBoardIndex = boardInputs.indexOf(input)
        this._changingValueInputSpacingIndex = spacingInputs.indexOf(input)
        this._changingValueInputIsBoard = this._changingValueInputBoardIndex !== -1
        this._changingValueCurrentValue = parseFloat(span.innerHTML) 
        this._changingValueCurrentValue = Number.isNaN(this._changingValueCurrentValue) ? 0 : this._changingValueCurrentValue
        this._changingValueInitalValue = this._changingValueCurrentValue

        this._changingValueUpdateAutoOrCustomButtonApperance = () => {
            if (this._changingValueIsAuto) {
                this.changeValueHeaderBoardAutoButton.classList.add("selected")
                this.changeValueHeaderBoardCustomButton.classList.remove("selected")
            } else {
                this.changeValueHeaderBoardAutoButton.classList.remove("selected")
                this.changeValueHeaderBoardCustomButton.classList.add("selected")
            }
        }

        var updateInputAndConfirmButtonApperance = () => {
            // Confirm button (disable/enable if value has changed)
            // Lower opacity on input span if is same as inital value 
            if (this._changingValueCurrentValue != this._changingValueInitalValue || (this._changingValueInputIsBoard && (this._changingValueIsAuto != this._changingValueIsAutoInitaly))) {
                this.focusConfirmButton.classList.remove("disabled")
                this._changingValueInputSpan.classList.remove("placeholder")
            } else {
                this.focusConfirmButton.classList.add("disabled")
                this._changingValueInputSpan.classList.add("placeholder")
            }
            if (this._changingValueInputIsBoard && this._changingValueIsAuto) {
                this._changingValueInputSpan.classList.remove("placeholder")
            }
        }

        // Board Change Value Setup (for when is board)
        if (this._changingValueInputIsBoard) {
            var customWidthFraction = this.layout.customWidthFractions[this._changingValueInputBoardIndex] 
            this._changingValueIsAuto = customWidthFraction === undefined || customWidthFraction == null
            this._changingValueIsAutoInitaly = this._changingValueIsAuto
            
            this._changingValueDefaultWidthForCustom = this._changingValueIsAuto ? this.layout.getAutoWidth() : this._changingValueInitalValue
            if (this._changingValueDefaultWidthForCustom == null || this._changingValueDefaultWidthForCustom < 7) {
                this._changingValueDefaultWidthForCustom = 15
            } else {
                this._changingValueDefaultWidthForCustom = Math.round(this._changingValueDefaultWidthForCustom * 10) / 10
            }

            this._changingValueUpdateAutoOrCustomButtonApperance()
            if (!this._changingValueIsAuto) {
                this._changingValueInputSpan.classList.add("placeholder")
            }

            this._changingValueBoardAutoClickListener = Listener.add({
                target: this.changeValueHeaderBoardAutoButton,
                eventType: "click",
                eventHandler: () => {
                    if (this._changingValueIsAuto) return; 
                    this._changingValueIsAuto = true
                    this._isAutoChangedInChangingValueSession()
                    this._changingValueUpdateAutoOrCustomButtonApperance()
                    updateInputAndConfirmButtonApperance()
                }
            })
            this.changeValueHeaderBoardCustomButton.innerHTML = this._changingValueDefaultWidthForCustom + " mm"
            this._changingValueBoardCustomClickListener = Listener.add({
                target: this.changeValueHeaderBoardCustomButton,
                eventType: "click",
                eventHandler: () => {
                    if (!this._changingValueIsAuto) return;
                    this._changingValueIsAuto = false
                    this._isAutoChangedInChangingValueSession()
                    this._changingValueUpdateAutoOrCustomButtonApperance()
                    updateInputAndConfirmButtonApperance()
                }
            })
        } else {
            this._changingValueInputSpan.classList.add("placeholder")
        }
        updateInputAndConfirmButtonApperance()
 

        // Setting mode & snap offset
        this._setMode({mode: BoardsConfiguratorSheetComponentMode.ChangeValue, animated: animated})
        this._setScrollingSnapOffset({element: input, xFraction: 0.5, animated: true})

        // Header Container (visibility)
        var headerBoardContainer = this.mainDiv.querySelector("#boards-component-header-board-valuechange-container")
        var spacingBoardContainer = this.mainDiv.querySelector("#boards-component-header-spacing-valuechange-container")
        headerBoardContainer.style.display = "none"
        spacingBoardContainer.style.display = "none"
        if (boardInputs.filter(x => x === input).length > 0) {
            headerBoardContainer.style.display = "flex"
        } else if (spacingInputs.filter(x => x == input).length > 0) {
            spacingBoardContainer.style.display = "flex"
        }

        // Confirm Clicked
        this._changingValueConfirmClickListener = Listener.add({
            target: this.focusConfirmButton,
            eventType: "click",
            eventHandler: () => {
                this._endChangingValue({cancelled: false})
                this._setMode({
                    mode: BoardsConfiguratorSheetComponentMode.Default, 
                    animated: true
                })
            }
        })

        // Keyboard Events
        this._valueChangeIsFirstInput = true
        this._changingValueKeyListener = Listener.add({
            target: document,
            eventType: "keyup",
            eventHandler: e => {
                if (e.code == "Backspace") {
                    if (this._valueChangeIsFirstInput) {
                        this._valueChangeIsFirstInput = false
                        this._changingValueCurrentValue = 0
                        this._valueChangeInChangingValueSession()
                        updateInputAndConfirmButtonApperance()
                    } else {
                        var newValueText = "" + this._changingValueCurrentValue 
                        if (newValueText.length >= 1) {
                            newValueText = newValueText.slice(0, -1);
                            this._changingValueCurrentValue = parseFloat(newValueText.replace(/\<br\>/g," ").trim().replace( /[^\d\.]*/g, ''));
                            if (Number.isNaN(this._changingValueCurrentValue)) {
                                this._changingValueCurrentValue = 0
                            }
                        } else {
                            this._changingValueCurrentValue = 0
                        }
                        this._valueChangeInChangingValueSession()
                        updateInputAndConfirmButtonApperance()
                    }
                } else {
                    var pressedNumber = parseFloat(e.key)
                    if (Number.isNaN(pressedNumber)) return;

                    if (this._valueChangeIsFirstInput) {
                        this._valueChangeIsFirstInput = false
                        this._changingValueCurrentValue = 0
                    } 
                    var newValueText = this._changingValueCurrentValue == 0 ? "" + pressedNumber :  "" + this._changingValueCurrentValue + pressedNumber
                    this._changingValueCurrentValue = parseFloat(newValueText.replace(/\<br\>/g," ").trim().replace( /[^\d\.]*/g, ''));
                    this._valueChangeInChangingValueSession()
                    updateInputAndConfirmButtonApperance()
                }
            }
        })
    }

    _valueChangeInChangingValueSession() {
        if (this._changingValueInputIsBoard && this._changingValueIsAuto) {
            this._changingValueIsAuto = false
            this._changingValueUpdateAutoOrCustomButtonApperance()
        }
        this._changingValueInputSpan.innerHTML = this._changingValueCurrentValue
    }

    // Called if auto is changed by clicking buttons
    _isAutoChangedInChangingValueSession() {
        if (!this._changingValueInputIsBoard) return;
        if (this._changingValueIsAuto) {
            this._changingValueInputSpan.innerHTML = "Auto"
            this._changingValueCurrentValue = 0
            this._valueChangeIsFirstInput = true
        } else {
            this._changingValueInputSpan.innerHTML = this._changingValueDefaultWidthForCustom
            this._changingValueCurrentValue = this._changingValueDefaultWidthForCustom
            this._valueChangeIsFirstInput = true
        }
    }

    // Only called by _setMode() & _beginChangingValue() (_beginChangingValue() only when successfull)
    _endChangingValue({cancelled}) {
        if (this._changingValueInput === undefined || this._changingValueInput == null) return;
        var inputs = Array.from(this.boardsGrid.querySelectorAll(":scope > div")).concat([this.boardsTotalWidthInput])
        inputs.forEach(x => x.classList.remove("dimmed"))


        if (cancelled) {
            this._changingValueIsAuto = this._changingValueIsAutoInitaly
            this._changingValueCurrentValue = this._changingValueInitalValue

            this._changingValueInputSpan.innerHTML = this._changingValueInitalValue
            if (this._changingValueInputIsBoard) {
                if (this._changingValueIsAutoInitaly) {
                    this._changingValueInputSpan.innerHTML = "Auto"
                }
            }
        } else {
            // Confirmed for board
            if (this._changingValueInputIsBoard) {
                if (this._changingValueIsAuto) {
                    this.layout.setBoardWidthToAuto({
                        index: this._changingValueInputBoardIndex,
                        minAutoWidth: 50 
                    })
                } else {
                    var succeededSettingWidth = this.layout.setBoardWidth({
                        index: this._changingValueInputBoardIndex,
                        width: this._changingValueCurrentValue,
                        scaleToFit: true,
                        minAutoWidth: 50
                    })
                }
                this.layoutDidChange()
                this.updateCustomOverlaySubtitle()
            } else {
                // Update total width
                if (this._changingValueInput === this.boardsTotalWidthInput) {
                    this.layout.setTotalWidth({
                        width: this._changingValueCurrentValue
                    })
                } else { 
                    // Update spacing
                    this.layout.setSpacing({
                        index: this._changingValueInputSpacingIndex,
                        spacing: this._changingValueCurrentValue,
                        scaleToFit: true,
                        minAutoWidth: 50
                    })
                }
                this._layoutReload()
                this.layoutDidChange()
                this.updateCustomOverlaySubtitle()
            }
        }
       
        this._changingValueInputSpan.classList.remove("placeholder")
        this._changingValueInput = null
        this._changingValueKeyListener.dispose()
        this._changingValueKeyListener = null
        this._changingValueConfirmClickListener.dispose()
        this._changingValueConfirmClickListener = null

        this._changingValueBoardAutoClickListener?.dispose()
        this._changingValueBoardAutoClickListener = null

        this._changingValueBoardCustomClickListener?.dispose()
        this._changingValueBoardCustomClickListener = null
        this._totalDidChange()
    }
    //#endregion

    //#region Focus Related (UI used when adding boards or editing value)
    _setFocusHidden(hidden) {
        if (hidden) {
            if (this._focusHeaderInitalHeight === undefined) {
                this._focusHeaderInitalHeight = getComputedStyle(this.focusHeader).getPropertyValue("height")
            } 
            // Hide header for adding board & changing value
            this.focusHeader.style.height = "0px"
            this.focusHeader.style.opacity = "0"
            // Hide bottom cancel/confirm buttons
            this.focusCancelConfirmContainer.style.height = "0px"
            this.focusCancelConfirmContainer.style.marginTop = "0px"
            this.focusCancelConfirmContainer.style.marginBottom = "0px"
        } else {
            if (this._focusHeaderInitalHeight !== undefined) {
                // Show header for adding board & changing value
                this.focusHeader.style.height = this._focusHeaderInitalHeight
            }
            this.focusHeader.style.opacity = "1"
            // Show bottom cancel/confirm buttons
            if (this.mode != BoardsConfiguratorSheetComponentMode.AddBoard) {
                this.focusCancelConfirmContainer.style.height = "50px"
                this.focusCancelConfirmContainer.style.marginTop = "14px"
                this.focusCancelConfirmContainer.style.marginBottom = "30px"
            }
        }
    }

    _setFocusConfirmButtonEnabled(enabled) {
        if (enabled) {
            this.focusConfirmButton.classList.remove("disabled")
        } else {
            this.focusConfirmButton.classList.add("disabled")
        }
    }
    //#endregion

    //#region Scrolling 
    _setScrollingContentOffset({offset, animated}) {
        var change = Math.abs(offset - this.contentOffset)
        this.contentOffset = offset
        var seconds = animated ? Math.max(change * 0.003, 0.11) : 0;
        var easing = "cubic-bezier(0.25, 1, 0.5, 1)"
        this.scrollingContainer.style.transition = "transform " + seconds + "s " + easing;
        this.scrollingContainer.style.transform = "translateX(" + offset + "px" + ")"
    }

    _setScrollingSnapOffset({element, xFraction, animated}) {
        if (this._scrollingSnapTimerId !== undefined && this._scrollingSnapTimerId != null) {
            clearInterval(this._scrollingSnapTimerId)
        }
        if (element != null) {
            this._scrollingSnapTimerId = setInterval(() => {
                var secondsSinceScroll = (new Date() - this._wheelDate ?? new Date()) / 1000; 
                if (secondsSinceScroll != NaN && secondsSinceScroll < 0.05) return; 

                var desiredOffset = this._scrollingSnapTarget
                var translationToDesired = desiredOffset - this.contentOffset 
                if (Math.abs(translationToDesired) > 0) {
                    this._setScrollingContentOffset({
                        offset: desiredOffset,
                        animated: true
                    })
                }
            }, 30)
        } 
        this._scrollingSnapElementBounds = null
        this._scrollingSnapTarget = null
        this._scrollingSnapFraction = xFraction === undefined ? null : xFraction
        this._scrollingSnapElement = element
        this.boundingBoxObserver.disconnect()
        if (element == null) {return}
        this.boundingBoxObserver.observe(element, {attributes: true, childList: true, subtree: true });
        var bounding = element.getBoundingClientRect()
        if (bounding.width == 0) {
            return
        }
        this._reloadScrollingForSnapOffset({animated: animated})
    }

    _reloadScrollingForSnapOffset({animated}) {
        if (this._scrollingSnapElement == null) return;
        var elementBounds = this._scrollingSnapElement.getBoundingClientRect()
        if (elementBounds.width == 0) return; 
        if (this._scrollingSnapElementBounds != null) {
            if (this._scrollingSnapElementBounds.width == elementBounds.width &&
                this._scrollingSnapElementBounds.height == elementBounds.height &&
                this._scrollingSnapElementBounds.x == elementBounds.x && 
                this._scrollingSnapElementBounds.y == elementBounds.y &&
                this._scrollingSnapElementBounds.left == elementBounds.left,
                this._scrollingSnapElementBounds.right == elementBounds.right) {
                return
            }
        }
        this._scrollingSnapElementBounds = elementBounds
        var offset = this._getScrollingOffsetToCenterDOMRect({rect: elementBounds, atFraction: this._scrollingSnapFraction})
        this._scrollingSnapTarget = offset
        this._setScrollingContentOffset({offset: offset, animated: animated})
    }

    _getScrollingOffsetForDOMRect({rect, atFraction}) {
        this._scrollingSnapElementBounds = rect
        var scrollContainerBounds = this.scrollingContainer.getBoundingClientRect()
        var offset = rect.x - scrollContainerBounds.x + (rect.width * atFraction)
        return offset
    }

    _getScrollingOffsetForElement({element, fraction}) {
        var elementBounds = element.getBoundingClientRect()
        return this._getScrollingOffsetForDOMRect({rect: elementBounds, atFraction: fraction})
    }

    _getScrollingOffsetToCenterDOMRect({rect, atFraction}) {
        this._scrollingSnapElementBounds = rect
        var scrollerBounds = this.componentDiv.getBoundingClientRect()
        var fromX = this._getScrollingOffsetForDOMRect({rect: rect, atFraction: atFraction}) 
        var toX = scrollerBounds.width / 2
        return toX - fromX
    }

    _getScrollingOffsetToCenterElement({element, atFraction}) {
        var elementBounds = element.getBoundingClientRect()
        return this._getScrollingOffsetToCenterDOMRect({rect: elementBounds, atFraction: atFraction})
    }
    //#endregion

    //#region S----- Component Protocol -----S
    /*
        Required constructor parameters:
        - mainDiv: Div 

        Callable methods on "this":
        - updatePreferences({animated}) - will result in ConfiguratorSheetContent calling getPreferences() on ConfiguratorSheet if wanted not mandatory
        - updateCustomOverlaySubtitle()
        - getRenderer() 
    */
    // Can be null if "component has no preferences"
    get isInitalized() {
        return this._isInitalized == undefined ? false : this._isInitalized;
    }
    initalized() {
        this._isInitalized = true;
        this.updateCustomOverlaySubtitle()
    }
    getPreferences() {
        var preferences = this.mode.componentPreferences()
        preferences.headerLeadingElements = [this.addButton]
        return preferences
    }
    getCustomOverlaySubtitle() {
        if (this.layout != null) {
            var autoWidth = this.layout.getAutoWidth()
            if (autoWidth != null) {
                autoWidth = Math.round(autoWidth * 10) / 10
                return "Auto: " + autoWidth + " mm"
            }
        }
        return null;
    }
    dispose() {
        this.wheelScrollListener.dispose()
        this.wheelScrollListener = null
    }
    //#endregion E----- Component Protocol -----E

    //#region Helper
    _setInputText({value, input}) {
        var span = input.querySelector("span")
        var float = parseFloat(value)
        if (float != null && Number.isNaN(float) == false) {
            value = Math.round(value * 10) / 10
        } 
        span.innerHTML = value
    }
    _totalDidChange() {
        var span = this.boardsTotalWidthInput.querySelector("span")
        span.innerHTML = this.layout.totalWidth 
    }
    //#endregion

}