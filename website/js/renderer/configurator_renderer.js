
class ConfiguratorRenderer {

    constructor() {
        this._rendererSetup()
        this.mouseDownListener = Listener.add({target: this.canvas,eventType: "mousedown", eventHandler: ev => this._mouseDown(ev)})
    }

    //#region Public
    setSceneBottomPadding({padding, animated, duration}) {
        this.setPosition({x: 0, y: -padding, duration: duration, animated: animated})
    }

    setTransformPreferences({preferences, animated}) {
        if (preferences.rotation != null) {
            if (preferences.rotation.maintain) {
                this.setPalletRotationMagnet({x: preferences.rotation.x, y: preferences.rotation.y, animate: animated})
            } else {
                this.palletRotationMagnetDelete()
                this.setRotation({x: preferences.rotation.x, y: preferences.rotation.y, animated: animated})
            }
        } else {
            this.palletRotationMagnetDelete()
        }
        // TODO: Add support for setting scale magnet
        if (preferences.scale != null) {
            
        } else {

        }
    }

    setPallet(newPallet) {
        objectRemoveFromParent(this.pallet)
        this.scene.add(newPallet.object)
        this.pallet = newPallet
        if (this._palletRotationMagnet != null) {
            this.pallet.object.rotation.x = this._palletRotationMagnet.x
            this.pallet.object.rotation.y = this._palletRotationMagnet.y
        } else {
            this.pallet.object.rotation.x = degrees_to_radians(0)
            this.pallet.object.rotation.y = degrees_to_radians(0)
        }
    }

    setPalletRotationMagnet({x, y, animate}) {
        this._palletRotationMagnet = {x: x, y: y}
        this.setRotation({x: x, y: y, duration: 2000, animated: animate})
    }

    palletRotationMagnetDelete() {
        this._palletRotationMagnet = null;
    }
    //#endregion

    _rendererSetup() {
        // Camera
        this.camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            3000);
        this.camera.position.y = 100
        this.camera.position.x = 0
        this.camera.position.z = 1500;
    
        // Renderer 
        this.canvas = document.getElementById("configurator-renderer-canvas")
        this.renderer = new THREE.WebGLRenderer({canvas: this.canvas, antialias: true, alpha: true});
    
        // Scene
        this.scene = new THREE.Scene(); {
            const fogColor = 0xFFFFFF; 
            const fogNear = 10;
            const fogFar = 4000;
            this.scene.fog = new THREE.Fog(fogColor, fogNear, fogFar)
    
            const color = 0xFFFFFF;
            const intensity = 1;

            const ambientLight = new THREE.AmbientLight(0xE8E8E8); // soft white light
            this.scene.add(ambientLight);

            const backLight = new THREE.DirectionalLight( 0xCACACA ); 
            backLight.position.set(700, 700, -1400)
            //this.scene.add(backLight)
            const backLightHelper = new THREE.DirectionalLightHelper( backLight, 700, 0x000000 ); 
            //this.scene.add( backLightHelper );

            const rightLight = new THREE.DirectionalLight( 0xFFFFFF, 0.3 ); 
            rightLight.position.set(1000, 300, -500)
            this.scene.add(rightLight)
            const rightLightHelper = new THREE.DirectionalLightHelper( rightLight, 700, 0x000000 ); 
            //this.scene.add( rightLightHelper );
        }

        var resize;
        window.addEventListener("resize", () => {
            clearTimeout(resize);
            resize = setTimeout(() => this._resize(), 150);
        }, false)
        this._resize()

        var minZoom = 0.8;
        var maxZoom = 1.5;

        window.addEventListener("wheel", e => {
            if (e.target.tagName == "CANVAS") {
                this._scaleAnimateTo({
                    scale: Math.min(maxZoom, Math.max(minZoom, this.scene.scale.x * (1 + ((e.deltaY * 0.4) / 600)))),
                    duration: 0.1
                })
            }
        }, false)

        // Begin rendering loop
        requestAnimationFrame(t => this._render(t));
    }
    
    _resize() {
        //const { width, height } = this.canvas.parentElement.getBoundingClientRect();
        var height = window.innerHeight;
        this.camera.aspect = window.innerWidth / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, height);
    }

    _render(time) {
        this.time = time * 0.001;
        this.renderer.render(this.scene, this.camera);
        if (this.pallet != null) {
            this.pallet.render(this.time)
        }
        TWEEN.update()
        requestAnimationFrame(t => this._render(t));
    }

    //#region Interaction 
    _mouseDown(ev) {
        ev.preventDefault()
        var mouseMove
        var mouseUp

        this._mouseDownRotate(ev)
        mouseMove = e => this._mouseMoveRotate(e)
        mouseUp = e => this._mouseUpRotate(e)

        this._mouseInitalClientX = ev.clientX
        this._mouseInitalClientY = ev.clientY
        this._mouseVelocity = 0;

        function makeVelocityCalculator(e_init, callback) {
            var x = e_init.clientX,
                y = e_init.clientY,
                t = Date.now();
            return function(e) {
                var new_x = e.clientX,
                    new_y = e.clientY,
                    new_t = Date.now();
                var x_dist = new_x - x,
                    y_dist = new_y - y,
                    interval = new_t - t;
                var velocity = Math.sqrt(x_dist*x_dist+y_dist*y_dist)/interval;
                callback(velocity);
                // update values:
                x = new_x;
                y = new_y;
                t = new_t;
            };
        }

        function makeRecentTranslationCalculator(e_init, callback) {
            class Point {
                constructor(x, y) {
                    this.x = x
                    this.y = y
                }
            }
            callback([0, 0])
            var points = []
            points.push(new Point(e_init.clientX, e_init.clientY))
            return function(e) {
                points.push(new Point(e.clientX, e.clientY))
                if (points.length > 20) {
                    points.shift()
                } 
                var first = points[0]
                var last = points[points.length - 1]
                callback([last.x - first.x, last.y - first.y])
            };
        }

        var velocityCalculator = makeVelocityCalculator(ev, result => {
            if ((isNaN(result) || !isFinite(result)) == false) {
                this._mouseVelocity = (isNaN(result) || !isFinite(result)) ? 0 : result;
            }
        })

        var recentTranslationCalculator = makeRecentTranslationCalculator(ev, result => {
            this._mouseRecentTranslationX = result[0]
            this._mouseRecentTranslationY = result[1]
        })

        this.mouseMoveListener = Listener.add({
            target: window,
            eventType: "mousemove",
            eventHandler: ev => {
                ev.preventDefault()
                velocityCalculator(ev)
                recentTranslationCalculator(ev)
                mouseMove(ev)
            }
        })
        this.mouseLeaveListener = Listener.add({
            target: window,
            eventType: "mouseleave",
            eventHandler: ev => {
                ev.preventDefault()
                this.mouseUpListener.dispose()
                this.mouseMoveListener.dispose()
                this.mouseLeaveListener.dispose()
                velocityCalculator(ev)
                recentTranslationCalculator(ev)
                mouseUp(ev)
            }
        })
        this.mouseUpListener = Listener.add({
            target: window,
            eventType: "mouseup",
            eventHandler: ev => {
                ev.preventDefault()
                this.mouseUpListener.dispose()
                this.mouseMoveListener.dispose()
                this.mouseLeaveListener.dispose()
                mouseUp(ev)
                velocityCalculator(ev)
            }
        })
    }
    //#endregion

    //#region Rotation
    _mouseDownRotate(ev) {
        this._mouseInitalPalletRotationY = this.pallet.object.rotation.y
        this._mouseInitalPalletRotationX = this.pallet.object.rotation.x
    }

    _mouseMoveRotate(ev) {
        var multiplier = (this._palletRotationMagnet == undefined || this._palletRotationMagnet == null) ? 0.1 : 0.04
        var translationX = (ev.clientX - this._mouseInitalClientX) * multiplier
        var translationY = (ev.clientY - this._mouseInitalClientY) * multiplier

        this._rotationAnimateTo({
            x: this._mouseInitalPalletRotationX + degrees_to_radians(translationY),
            y: this._mouseInitalPalletRotationY + degrees_to_radians(translationX),
            duration: 0.1
        })
    }

    _mouseUpRotate(ev) {
        if (this._palletRotationMagnet == undefined || this._palletRotationMagnet == null) {
            // Deceleration 
            var velocity = this._mouseVelocity == 0 ? 0.05 : this._mouseVelocity;
            var translationX = this._mouseRecentTranslationX * 0.0005 * velocity
            var translationY = this._mouseRecentTranslationY * 0.0005 * velocity

            var maxX = 2
            var maxY = 2

            translationY = translationY < 0 ? Math.max(translationY, -maxY) : Math.min(translationY, maxY)
            translationX = translationX < 0 ? Math.max(translationX, -maxX) : Math.min(translationX, maxX)

            var newY = this.pallet.object.rotation.y + translationX
            var newX = this.pallet.object.rotation.x + translationY

            this._rotationAnimateTo({
                x: newX,
                y: newY,
                duration: 700
            })
        } else {
            this._rotationAnimateTo({
                x: this._palletRotationMagnet.x,
                y: this._palletRotationMagnet.y,
                duration: 1300
            })
        }
    }
    //#endregion

    //#region Helpers 
    setRotation({x, y, duration, animated}) {
        if (animated) {
            this._rotationAnimateTo({x: x, y: y, duration: duration})
        } else {
            this.pallet.object.rotation.x = x
            this.pallet.object.rotation.y = y
        }
    }

    setPosition({x, y, duration, animated}) {
        if (animated) {
            this._translateAnimateTo({x: x, y: y, duration: duration})
        } else {
            this.scene.position.x = x
            this.scene.position.y = y
        }
    }
    //#endregion

    //#region Animations
    _rotationAnimateTo({x, y, duration}) {
        if (this._rotationTween != undefined) {
            this._rotationTween.stop()
            this._rotationTween = null;
        }
        var rotation = {x: this.pallet.object.rotation.x, y: this.pallet.object.rotation.y}
        var target = {x: x, y: y}

        this._rotationTween = new TWEEN.Tween(rotation).to(target, duration);
        this._rotationTween.easing(TWEEN.Easing.Exponential.Out)
        this._rotationTween.onUpdate(() => {
            this.pallet.object.rotation.x = rotation.x
            this.pallet.object.rotation.y = rotation.y
        });
        this._rotationTween.start();
    }

    _scaleAnimateTo({scale, duration}) {
        if (this._scaleTween != undefined) {
            this._scaleTween.stop()
            this._scaleTween = null
        }
        var scaleObject = {value: this.scene.scale.x}
        var target = {value: scale}

        this._scaleTween = new TWEEN.Tween(scaleObject).to(target, duration);
        this._scaleTween.easing(TWEEN.Easing.Exponential.Out)
        this._scaleTween.onUpdate(() => {
            this.scene.scale.x = scaleObject.value
            this.scene.scale.y = scaleObject.value
            this.scene.scale.z = scaleObject.value
        });
        this._scaleTween.start();
    }

    _translateAnimateTo({x, y, duration}) {
        if (this._positionTween != undefined) {
            this._positionTween.stop()
            this._positionTween = null;
        }
        var position = {x: this.scene.position.x, y: this.scene.position.y}
        var target = {x: x, y: y}

        this._positionTween = new TWEEN.Tween(position).to(target, duration);
        this._positionTween.easing(TWEEN.Easing.Exponential.Out)
        this._positionTween.onUpdate(() => {
            this.scene.position.x = position.x
            this.scene.position.y = position.y
        });
        this._positionTween.start();
    }
    //#endregion


}