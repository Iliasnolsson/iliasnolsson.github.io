
class ConfiguratorRenderer {

    constructor() {
        this._rendererSetup()
        this.mouseDownListener = DisposableEventListener.add({target: this.canvas,eventType: "mousedown", eventHandler: ev => this._mouseDown(ev)})
    }

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
        this.scene = new THREE.Scene();
        const color = 0xFFFFFF;
        const intensity = 1;

        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(0, 700, 1300);
        this.scene.add(light);

        // Resizing 
        window.addEventListener("resize", () => this._resize(), false)
        this._resize()

        // Begin rendering loop
        requestAnimationFrame(t => this._render(t));
    }
    
    _resize() {
        //const { width, height } = this.canvas.parentElement.getBoundingClientRect();
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    _render(time) {
        time *= 0.001;
        this.renderer.render(this.scene, this.camera);
        if (this.pallet != null) {
            this.pallet.render(time)
        }
        requestAnimationFrame(t => this._render(t));
    }

    setPallet(newPallet) {
        objectRemoveFromParent(this.pallet)
        this.scene.add(newPallet.object)
        this.pallet = newPallet
        this.pallet.object.rotation.x = degrees_to_radians(0)
        this.pallet.object.rotation.y = degrees_to_radians(0)
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

        this.mouseMoveListener = DisposableEventListener.add({
            target: window,
            eventType: "mousemove",
            eventHandler: ev => {
                ev.preventDefault()
                mouseMove(ev)
            }
        })
        this.mouseUpListener = DisposableEventListener.add({
            target: window,
            eventType: "mouseup",
            eventHandler: ev => {
                ev.preventDefault()
                this.mouseUpListener.dispose()
                this.mouseMoveListener.dispose()
                mouseUp(ev)
            }
        })
    }

    _mouseDownRotate(ev) {
        this._mouseInitalPalletRotationY = this.pallet.object.rotation.y
        this._mouseInitalPalletRotationX = this.pallet.object.rotation.x
    }

    _mouseMoveRotate(ev) {
        var translationX = (ev.clientX - this._mouseInitalClientX) * 0.2
        var translationY = (ev.clientY - this._mouseInitalClientY) * 0.2

        this.pallet.object.rotation.y = this._mouseInitalPalletRotationY + degrees_to_radians(translationX)
        this.pallet.object.rotation.x = this._mouseInitalPalletRotationX + degrees_to_radians(translationY)
    }

    _mouseUpRotate(ev) {


    }


    //#endregion



}